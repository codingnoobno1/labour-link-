import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 1. Fetch Company ID
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id')
      .eq('owner_id', user.id)
      .single();

    if (companyError || !company) {
      return NextResponse.json({ 
        totalPostings: 0,
        totalApplicants: 0,
        hiringRate: 0,
        activeWorkers: 0,
        spend: 0
      });
    }

    // 2. Fetch Jobs and Applications
    const { data: jobs, error: jobsError } = await supabase
      .from('works')
      .select(`
        id,
        applications (
          id,
          status,
          assigned
        )
      `)
      .eq('company_id', company.id);

    if (jobsError) {
      return NextResponse.json({ error: jobsError.message }, { status: 400 });
    }

    const totalPostings = jobs.length;
    const totalApplications = jobs.reduce((sum, job) => sum + (job.applications?.length || 0), 0);
    const activeWorkers = jobs.reduce((sum, job) => {
      const hires = job.applications?.filter((app: any) => app.status === 'accepted').length || 0;
      return sum + hires;
    }, 0);

    // Mock hiring rate and spend for now (until shifts/payments are fully integrated)
    const hiringRate = totalApplications > 0 ? (activeWorkers / totalApplications) * 100 : 0;
    const spend = jobs.reduce((sum, job) => sum + 0, 0); // Placeholder

    return NextResponse.json({
      totalPostings,
      totalApplicants: totalApplications,
      hiringRate: Math.round(hiringRate),
      activeWorkers,
      spend,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Employer dashboard stats error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
