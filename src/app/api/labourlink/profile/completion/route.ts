import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check profile table
    const { data: profile } = await supabase
      .from('profiles')
      .select('name, phone, avatar_url')
      .eq('id', user.id)
      .single();

    // Check documents table for Aadhar
    const { data: documents } = await supabase
      .from('documents')
      .select('type')
      .eq('user_id', user.id);

    const hasAadhar = documents?.some(doc => doc.type === 'aadhar');

    let filledFields = 0;
    const totalFields = 4; // name, phone, avatar, aadhar

    if (profile?.name) filledFields++;
    if (profile?.phone) filledFields++;
    if (profile?.avatar_url) filledFields++;
    if (hasAadhar) filledFields++;

    const completionPercentage = (filledFields / totalFields) * 100;

    return NextResponse.json({
      completion: completionPercentage,
      details: {
        hasName: !!profile?.name,
        hasPhone: !!profile?.phone,
        hasAvatar: !!profile?.avatar_url,
        hasAadhar
      }
    }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
