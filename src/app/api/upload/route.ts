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

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'labour-link-avatars',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            resolve(NextResponse.json({ error: 'Upload failed' }, { status: 500 }));
          } else {
            resolve(NextResponse.json({ url: result?.secure_url }, { status: 200 }));
          }
        }
      );

      uploadStream.end(buffer);
    });
  } catch (error: any) {
    console.error('Upload route error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
