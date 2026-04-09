import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status } = await request.json();

    if (!['open', 'closed'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status. Must be "open" or "closed".' }, { status: 400 });
    }

    // Check ownership
    const { data: job, error: checkError } = await supabase
      .from('works')
      .select('id, companies!inner(owner_id)')
      .eq('id', params.id)
      .eq('companies.owner_id', user.id)
      .single();

    if (checkError || !job) {
      return NextResponse.json({ error: 'Job not found or unauthorized' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('works')
      .update({ status })
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Job status update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
