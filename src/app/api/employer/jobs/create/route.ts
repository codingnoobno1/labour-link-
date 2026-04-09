import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get company for this employer
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id')
      .eq('owner_id', user.id)
      .single();

    if (companyError || !company) {
      return NextResponse.json({ error: 'Company not found. Complete company setup first.' }, { status: 404 });
    }

    const { title, description, location, pay, duration, type } = await request.json();

    const { data, error } = await supabase
      .from('works')
      .insert({
        company_id: company.id,
        title,
        description,
        location,
        pay,
        duration,
        type,
        status: 'open',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    console.error('Job creation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
