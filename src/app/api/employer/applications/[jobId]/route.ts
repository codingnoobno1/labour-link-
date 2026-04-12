import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const { jobId } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // List applications for a specific job, ensuring the job belongs to the employer
    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        profiles (
          id,
          name,
          phone,
          avatar_url,
          skills
        ),
        works!inner (
          title,
          companies!inner (
            owner_id
          )
        )
      `)
      .eq('work_id', jobId)
      .eq('works.companies.owner_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Job applications fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
