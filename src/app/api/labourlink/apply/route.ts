import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { work_id, bid_amount } = await request.json();

    if (!work_id || !bid_amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if job is open
    const { data: job, error: jobError } = await supabase
      .from('works')
      .select('status')
      .eq('id', work_id)
      .single();

    if (jobError || !job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    if (job.status !== 'open') {
      return NextResponse.json({ error: 'Job is no longer open for applications' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('applications')
      .insert({
        user_id: user.id,
        work_id,
        bid_amount,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json({ error: 'You have already applied for this job' }, { status: 400 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Application creation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('applications')
      .select(`
        *,
        works (
          title,
          location,
          pay,
          companies (
            name,
            logo_url
          )
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Applications fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
