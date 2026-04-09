import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: job, error } = await supabase
      .from('works')
      .select(`
        *,
        companies!inner(owner_id)
      `)
      .eq('id', id)
      .eq('companies.owner_id', user.id)
      .single();

    if (error || !job) {
      return NextResponse.json({ error: 'Job not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error: any) {
    console.error('Job detail GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
