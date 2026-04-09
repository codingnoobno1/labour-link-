import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function DELETE(
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

    // Check ownership before delete via join or direct check
    // Since we're deleting, we can use a subquery in the delete if RLS allows, 
    // but here we'll do an explicit check.
    const { data: job, error: checkError } = await supabase
      .from('works')
      .select('id, companies!inner(owner_id)')
      .eq('id', id)
      .eq('companies.owner_id', user.id)
      .single();

    if (checkError || !job) {
      return NextResponse.json({ error: 'Job not found or unauthorized' }, { status: 404 });
    }

    const { error: deleteError } = await supabase
      .from('works')
      .delete()
      .eq('id', id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Job deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error('Job deletion error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
