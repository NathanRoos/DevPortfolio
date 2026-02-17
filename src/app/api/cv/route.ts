import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const CV_STORAGE_PATH = path.join(process.cwd(), 'public', 'cv.pdf');

// GET: Return the current CV URL if exists
export async function GET() {
  try {
    await fs.access(CV_STORAGE_PATH);
    return NextResponse.json({ url: '/cv.pdf' });
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
  await fs.writeFile(CV_STORAGE_PATH, Buffer.from(arrayBuffer));
  return NextResponse.json({ url: '/cv.pdf' });
}

// DELETE: Remove the current CV
export async function DELETE() {
  try {
    await fs.unlink(CV_STORAGE_PATH);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'No CV to delete' }, { status: 404 });
  }
}
