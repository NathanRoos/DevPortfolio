import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const CV_FOLDER = 'portfolio-cv';

// GET: Return the current CV URL if exists (fetch latest from Cloudinary)
export async function GET() {
  try {
    const res = await cloudinary.search
      .expression(`folder:${CV_FOLDER} AND resource_type:raw`)
      .sort_by('uploaded_at','desc')
      .max_results(1)
      .execute();
    const file = res.resources?.[0];
    return NextResponse.json({ url: file ? file.secure_url : '' });
  } catch {
    return NextResponse.json({ url: '' });
  }
}

// POST: Upload a new CV (PDF)
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  if (file.type !== 'application/pdf') return NextResponse.json({ error: 'Only PDF allowed' }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Cloudinary as raw file
  const uploadPromise = new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: CV_FOLDER,
        resource_type: 'raw',
        type: 'upload', // ensure public access
        format: 'pdf',
        public_id: 'cv', // always overwrite the same file
        overwrite: true,
      },
      (error, result) => {
        if (error || !result) reject(error || new Error('Cloudinary upload failed'));
        else resolve(result);
      }
    );
    stream.end(buffer);
  });

  try {
    const result: any = await uploadPromise;
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    return NextResponse.json({ error: 'Cloudinary upload failed' }, { status: 500 });
  }
}

// DELETE: Remove the current CV from Cloudinary
export async function DELETE() {
  try {
    await cloudinary.uploader.destroy(`${CV_FOLDER}/cv`, { resource_type: 'raw' });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'No CV to delete' }, { status: 404 });
  }
}
