import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    
    const { data: job, error } = await supabase
      .from('works')
      .select(`
        *,
        companies (
          name,
          logo_url,
          location,
          description
        )
      `)
      .eq('id', params.id)
      .eq('status', 'open') // Workers can only see open jobs
      .single();

    if (error || !job) {
      return NextResponse.json({ error: 'Job not found or closed' }, { status: 404 });
    }

    return NextResponse.json(job, { status: 200 });
  } catch (error: any) {
    console.error('Work detail GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
