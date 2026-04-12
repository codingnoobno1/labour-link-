import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if application exists and belongs to user
    const { data: app, error: checkError } = await supabase
      .from('applications')
      .select('id, status')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (checkError || !app) {
      return NextResponse.json({ error: 'Application not found or unauthorized' }, { status: 404 });
    }

    if (app.status !== 'pending') {
      return NextResponse.json({ error: 'Cannot cancel a processed application' }, { status: 400 });
    }

    const { error: deleteError } = await supabase
      .from('applications')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Application cancelled' }, { status: 200 });
  } catch (error: any) {
    console.error('Application cancel error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
