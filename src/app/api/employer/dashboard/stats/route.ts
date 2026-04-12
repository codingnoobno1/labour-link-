import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Active jobs (status = 'open')
    const { count: activeJobs, error: jobsError } = await supabase
      .from('works')
      .select('id, companies!inner(owner_id)', { count: 'exact', head: true })
      .eq('status', 'open')
      .eq('companies.owner_id', user.id);

    // Total applications for employer's jobs
    const { count: totalApplications, error: appsError } = await supabase
      .from('applications')
      .select('id, works!inner(companies!inner(owner_id))', { count: 'exact', head: true })
      .eq('works.companies.owner_id', user.id);

    // Pending hires (applications with status = 'pending')
    const { count: pendingHires, error: pendingError } = await supabase
      .from('applications')
      .select('id, works!inner(companies!inner(owner_id))', { count: 'exact', head: true })
      .eq('status', 'pending')
      .eq('works.companies.owner_id', user.id);

    if (jobsError || appsError || pendingError) {
      return NextResponse.json({ error: 'Error fetching dashboard stats' }, { status: 400 });
    }

    return NextResponse.json({
      activeJobs: activeJobs || 0,
      totalApplications: totalApplications || 0,
      pendingHires: pendingHires || 0,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Employer dashboard stats error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
