import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get aggregated stats for all applications on jobs owned by the employer
    const { data: apps, error } = await supabase
      .from('applications')
      .select(`
        status,
        works!inner (
          companies!inner (
            owner_id
          )
        )
      `)
      .eq('works.companies.owner_id', user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    const stats = {
      total: apps.length,
      pending: apps.filter(a => a.status === 'pending').length,
      accepted: apps.filter(a => a.status === 'accepted').length,
      rejected: apps.filter(a => a.status === 'rejected').length,
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error: any) {
    console.error('Application stats error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
