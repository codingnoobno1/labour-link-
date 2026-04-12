import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const skill = searchParams.get('skill');
    const name = searchParams.get('name');

    let query = supabase
      .from('profiles')
      .select('id, name, phone, avatar_url, skills, role')
      .eq('role', 'labour');

    if (skill) {
      query = query.contains('skills', [skill]);
    }
    if (name) {
      query = query.ilike('name', `%${name}%`);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error('Worker discovery error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
