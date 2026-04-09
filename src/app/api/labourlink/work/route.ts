import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Workers only see 'open' jobs
    const { data: jobs, error } = await supabase
      .from('works')
      .select(`
        *,
        companies (
          name,
          logo_url,
          location
        )
      `)
      .eq('status', 'open')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(jobs, { status: 200 });
  } catch (error: any) {
    console.error('Work feed GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
