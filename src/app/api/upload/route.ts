import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    if (!file || typeof file !== 'object' || !('arrayBuffer' in file)) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }
    // Accept PNG, JPG, JPEG, GIF, WEBP
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Only PNG, JPG, JPEG, GIF, or WEBP files are allowed.' }, { status: 400 });
    }
    // Determine file extension for Cloudinary format
    let format = 'png';
    if (file.type === 'image/jpeg' || file.type === 'image/jpg') format = 'jpg';
    if (file.type === 'image/gif') format = 'gif';
    if (file.type === 'image/webp') format = 'webp';
    const buffer = Buffer.from(await file.arrayBuffer());
    let imageUrl: string | undefined = undefined;
    await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'portfolio-projects', resource_type: 'image', format },
        (error, result) => {
          if (error || !result) reject(error || new Error('Cloudinary upload failed'));
          imageUrl = result.secure_url;
          resolve(result);
        }
      );
      stream.end(buffer);
    });
    if (!imageUrl) {
      return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
    }
    return NextResponse.json({ url: imageUrl });
  } catch (error) {
    console.error('Image upload error:', error);
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
  }
}
