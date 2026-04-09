import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function PUT(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, location, description } = await request.json();

    // Check if company exists
    const { data: existingCompany } = await supabase
      .from('companies')
      .select('id')
      .eq('owner_id', user.id)
      .single();

    let result;
    if (existingCompany) {
      result = await supabase
        .from('companies')
        .update({ name, location, description })
        .eq('owner_id', user.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('companies')
        .insert({ name, location, description, owner_id: user.id })
        .select()
        .single();
    }

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 400 });
    }

    return NextResponse.json(result.data, { status: 200 });
  } catch (error: any) {
    console.error('Company update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
