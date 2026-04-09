import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const cloudinaryResult = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'labour-link-documents',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    const { data, error } = await supabase
      .from('documents')
      .insert({
        user_id: user.id,
        type: 'aadhar',
        url: cloudinaryResult.secure_url,
        verified: false,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ url: cloudinaryResult.secure_url, document: data }, { status: 200 });
  } catch (error: any) {
    console.error('Aadhar upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
