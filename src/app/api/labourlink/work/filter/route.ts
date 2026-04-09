import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);

    const minPay = searchParams.get('minPay');
    const type = searchParams.get('type');
    const location = searchParams.get('location');
    const sortBy = searchParams.get('sortBy'); // 'pay_desc', 'newest'

    let query = supabase
      .from('works')
      .select(`
        *,
        companies (
          name,
          logo_url,
          location
        )
      `)
      .eq('status', 'open');

    if (minPay) {
      query = query.gte('pay', parseInt(minPay));
    }
    if (type) {
      query = query.eq('type', type);
    }
    if (location) {
      query = query.ilike('location', `%${location}%`);
    }

    if (sortBy === 'pay_desc') {
      query = query.order('pay', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data: jobs, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(jobs, { status: 200 });
  } catch (error: any) {
    console.error('Work filter error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
