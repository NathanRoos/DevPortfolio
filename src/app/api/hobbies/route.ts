import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { hobbySchema } from '../../../lib/validators';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    const hobbies = await prisma.hobby.findMany({
      orderBy: {
        name: 'asc',
      }
    });
    
    return NextResponse.json(hobbies);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Parse multipart form data
    const formData = await request.formData();
    const name = formData.get('name');
    const iconFile = formData.get('icon');

    if (typeof name !== 'string') {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    let iconUrl: string | undefined = undefined;
    if (iconFile && typeof iconFile === 'object' && 'arrayBuffer' in iconFile) {
      // Only accept PNG
      if (iconFile.type !== 'image/png') {
        return NextResponse.json({ error: 'Only PNG files are allowed.' }, { status: 400 });
      }
      const buffer = Buffer.from(await iconFile.arrayBuffer());
      const uploadRes = await cloudinary.uploader.upload_stream({
        folder: 'portfolio-hobbies',
        resource_type: 'image',
        format: 'png',
      }, (error, result) => {
        if (error || !result) throw new Error('Cloudinary upload failed');
        iconUrl = result.secure_url;
      });
      // Use a promise to wait for upload_stream
      await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'portfolio-hobbies', resource_type: 'image', format: 'png' },
          (error, result) => {
            if (error || !result) reject(error || new Error('Cloudinary upload failed'));
            iconUrl = result.secure_url;
            resolve(result);
          }
        );
        stream.end(buffer);
      });
    }

    const validatedData = hobbySchema.parse({ name, icon: iconUrl });
    const hobby = await prisma.hobby.create({ data: validatedData });
    return NextResponse.json(hobby, { status: 201 });
  } catch (error) {
    console.error('Error creating hobby:', error);
    return NextResponse.json(
      { error: 'Failed to create hobby' },
      { status: 500 }
    );
  }
}
