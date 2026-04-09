import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function PUT(
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

    const body = await request.json();
    const { title, description, location, pay, duration, type } = body;

    // First check ownership
    const { data: existingJob, error: checkError } = await supabase
      .from('works')
      .select('id, companies!inner(owner_id)')
      .eq('id', id)
      .eq('companies.owner_id', user.id)
      .single();

    if (checkError || !existingJob) {
      return NextResponse.json({ error: 'Job not found or unauthorized' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('works')
      .update({
        title,
        description,
        location,
        pay,
        duration,
        type,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Job update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
