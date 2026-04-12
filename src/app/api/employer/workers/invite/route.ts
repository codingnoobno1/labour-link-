import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { job_id, worker_id } = await request.json();

    if (!job_id || !worker_id) {
      return NextResponse.json({ error: 'Missing job_id or worker_id' }, { status: 400 });
    }

    // Verify job belongs to employer
    const { data: job, error: jobError } = await supabase
      .from('works')
      .select('id, companies!inner(owner_id)')
      .eq('id', job_id)
      .eq('companies.owner_id', user.id)
      .single();

    if (jobError || !job) {
      return NextResponse.json({ error: 'Job not found or unauthorized' }, { status: 404 });
    }

    // Verify worker exists
    const { data: worker, error: workerError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', worker_id)
      .eq('role', 'labour')
      .single();

    if (workerError || !worker) {
      return NextResponse.json({ error: 'Worker not found' }, { status: 404 });
    }

    const { data, error } = await supabase
      .from('invitations')
      .insert({
        job_id,
        worker_id,
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') { // Unique constraint
        return NextResponse.json({ error: 'Invitation already sent for this job' }, { status: 400 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Invite worker error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
