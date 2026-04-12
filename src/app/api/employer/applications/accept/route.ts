import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { application_id } = await request.json();

    if (!application_id) {
      return NextResponse.json({ error: 'Missing application_id' }, { status: 400 });
    }

    // Check ownership
    const { data: app, error: checkError } = await supabase
      .from('applications')
      .select(`
        id,
        works!inner (
          companies!inner (
            owner_id
          )
        )
      `)
      .eq('id', application_id)
      .eq('works.companies.owner_id', user.id)
      .single();

    if (checkError || !app) {
      return NextResponse.json({ error: 'Application not found or unauthorized' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('applications')
      .update({ status: 'accepted' })
      .eq('id', application_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Application accept error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
