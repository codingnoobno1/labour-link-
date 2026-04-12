import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Recent activity: Fetch most recent applications and invitations
    const { data: recentApps, error: appsError } = await supabase
      .from('applications')
      .select(`
        id,
        status,
        created_at,
        works (
          title
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    const { data: recentInvites, error: invitesError } = await supabase
      .from('invitations')
      .select(`
        id,
        status,
        created_at,
        works (
          title
        )
      `)
      .eq('worker_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);

    if (appsError || invitesError) {
      return NextResponse.json({ error: 'Error fetching activity' }, { status: 400 });
    }

    // Combine and sort by date
    const activity = [
      ...(recentApps || []).map((a: any) => ({
        type: 'application',
        id: a.id,
        status: a.status,
        date: a.created_at,
        title: a.works?.title,
      })),
      ...(recentInvites || []).map((i: any) => ({
        type: 'invitation',
        id: i.id,
        status: i.status,
        date: i.created_at,
        title: i.works?.title,
      })),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
     .slice(0, 10);

    return NextResponse.json(activity, { status: 200 });
  } catch (error: any) {
    console.error('Worker activity error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
