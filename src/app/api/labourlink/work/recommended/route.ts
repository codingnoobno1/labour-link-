import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get worker skills
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('skills')
      .eq('id', user.id)
      .single();

    if (profileError || !profile?.skills || profile.skills.length === 0) {
      // If no skills, return recent jobs as defaults
      const { data: recentJobs } = await supabase
        .from('works')
        .select('*, companies(name, logo_url)')
        .eq('status', 'open')
        .order('created_at', { ascending: false })
        .limit(10);
      return NextResponse.json(recentJobs || [], { status: 200 });
    }

    // Match skills with job title or description
    // Using or condition for each skill
    let query = supabase
      .from('works')
      .select(`
        *,
        companies (
          name,
          logo_url,
          location
        )
      `)
      .eq('status', 'open');

    // Simple keyword matching: check if any skill is in title or description
    // Postgres ILIKE with any(array) is better, but here we build a simple filter
    const skillFilters = profile.skills.map((skill: string) => `title.ilike.%${skill}%,description.ilike.%${skill}%`).join(',');
    
    // Using supabase or() filter
    // Note: or() syntax is slightly different depending on version, 
    // but here we use the standard string based one.
    const orFilter = profile.skills.map((skill: string) => `title.ilike.%${skill}%,description.ilike.%${skill}%`).join(',');
    
    const { data: jobs, error } = await query.or(orFilter);

    if (error) {
      console.error('Recommendation query error:', error);
      // Fallback to recent if match fails
      const { data: fallback } = await supabase
        .from('works')
        .select('*, companies(name, logo_url)')
        .eq('status', 'open')
        .limit(5);
      return NextResponse.json(fallback || [], { status: 200 });
    }

    return NextResponse.json(jobs, { status: 200 });
  } catch (error: any) {
    console.error('Recommendation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
