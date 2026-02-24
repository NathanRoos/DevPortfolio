import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

// Always use the singleton row with id = 1
const INFO_ID = 1;

export async function GET() {
  try {
    let info = await prisma.siteInfo.findUnique({ where: { id: INFO_ID } });
    if (!info) {
      // If not found, return defaults
      return NextResponse.json({
        contactEmail: '',
        helpInfo: '',
        directEmail: '',
        homeTitle: 'Full Stack Developer & DevOps Developer',
        homeDescription: 'Crafting scalable applications with cutting-edge technologies.'
      });
    }
    return NextResponse.json(info);
  } catch (e) {
    return NextResponse.json({
      contactEmail: '',
      helpInfo: '',
      directEmail: ''
    });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  // Upsert the singleton row
  await prisma.siteInfo.upsert({
    where: { id: INFO_ID },
    update: {
      contactEmail: body.contactEmail,
      helpInfo: body.helpInfo,
      directEmail: body.directEmail,
      homeTitle: body.homeTitle,
      homeDescription: body.homeDescription,
    },
    create: {
      id: INFO_ID,
      contactEmail: body.contactEmail,
      helpInfo: body.helpInfo,
      directEmail: body.directEmail,
      homeTitle: body.homeTitle || 'Full Stack Developer & DevOps Developer',
      homeDescription: body.homeDescription || 'Crafting scalable applications with cutting-edge technologies.',
    },
  });
  return NextResponse.json({ success: true });
}
