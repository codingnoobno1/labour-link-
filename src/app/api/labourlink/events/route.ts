import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Fetch upcoming events
    const { data: events, error } = await supabase
      .from('events')
      .select('*')
      .gte('datetime', new Date().toISOString())
      .order('datetime', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(events, { status: 200 });
  } catch (error: any) {
    console.error('Events fetch error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
