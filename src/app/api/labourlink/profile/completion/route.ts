import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch profile and check if aadhar exists in documents
    const [profileRes, docRes] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', user.id).single(),
      supabase.from('documents').select('id').eq('user_id', user.id).eq('type', 'aadhar').limit(1)
    ]);

    if (profileRes.error) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    const profile = profileRes.data;
    const aadharExists = docRes.data && docRes.data.length > 0;

    let completion = 0;
    const items = [
      { field: 'name', value: profile.name, weight: 20 },
      { field: 'phone', value: profile.phone, weight: 20 },
      { field: 'skills', value: profile.skills && profile.skills.length > 0, weight: 20 },
      { field: 'avatar_url', value: profile.avatar_url, weight: 20 },
      { field: 'aadhar_doc', value: aadharExists, weight: 20 },
    ];

    items.forEach(item => {
      if (item.value) {
        completion += item.weight;
      }
    });

    return NextResponse.json({
      completion,
      details: items.map(item => ({
        field: item.field,
        completed: !!item.value
      }))
    }, { status: 200 });
  } catch (error: any) {
    console.error('Completion calculation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
