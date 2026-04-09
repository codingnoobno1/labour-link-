import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('*')
      .eq('owner_id', user.id)
      .single();

    if (companyError && companyError.code !== 'PGRST116') { // PGRST116 is no rows returned
      return NextResponse.json({ error: companyError.message }, { status: 400 });
    }

    return NextResponse.json(company || { message: 'No company found' }, { status: 200 });
  } catch (error: any) {
    console.error('Company GET error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
