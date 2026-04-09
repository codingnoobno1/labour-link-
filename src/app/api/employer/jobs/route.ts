import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get jobs via company ownership
    const { data: jobs, error } = await supabase
      .from('works')
      .select(`
        *,
        companies!inner(owner_id)
      `)
      .eq('companies.owner_id', user.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(jobs, { status: 200 });
  } catch (error: any) {
    console.error('Jobs GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
