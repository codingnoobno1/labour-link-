import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all applications for the worker
    const { data: apps, error: appsError } = await supabase
      .from('applications')
      .select(`
        status,
        bid_amount,
        works (
          pay
        )
      `)
      .eq('user_id', user.id);

    if (appsError) {
      return NextResponse.json({ error: appsError.message }, { status: 400 });
    }

    const totalApplications = apps.length;
    const acceptedJobs = apps.filter(a => a.status === 'accepted').length;
    
    // Estimated earnings: sum of pay from accepted jobs
    const estimatedEarnings = apps
      .filter(a => a.status === 'accepted')
      .reduce((sum, a: any) => sum + (a.works?.pay || 0), 0);

    return NextResponse.json({
      totalApplications,
      acceptedJobs,
      estimatedEarnings,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Worker dashboard stats error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
