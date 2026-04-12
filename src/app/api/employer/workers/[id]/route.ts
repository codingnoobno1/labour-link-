import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('id, name, phone, avatar_url, skills, role, created_at')
      .eq('id', id)
      .eq('role', 'labour')
      .single();

    if (error || !profile) {
      return NextResponse.json({ error: 'Worker not found' }, { status: 404 });
    }

    return NextResponse.json(profile, { status: 200 });
  } catch (error: any) {
    console.error('Worker detail fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
