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
        helpInfoFr: '',
        directEmail: '',
        homeTitle: 'Full Stack Developer & DevOps Developer',
        homeTitleFr: 'Développeur Full Stack & DevOps',
        homeDescription: 'Crafting scalable applications with cutting-edge technologies.',
        homeDescriptionFr: 'Création d’applications évolutives avec des technologies de pointe.',
        homeStack: 'Next.js • Kubernetes • Modern Cloud Infrastructure',
        homeStackFr: 'Next.js • Kubernetes • Infrastructure Cloud Moderne'
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
      helpInfoFr: body.helpInfoFr,
      directEmail: body.directEmail,
      homeTitle: body.homeTitle,
      homeTitleFr: body.homeTitleFr,
      homeDescription: body.homeDescription,
      homeDescriptionFr: body.homeDescriptionFr,
      homeStack: body.homeStack,
      homeStackFr: body.homeStackFr,
    },
    create: {
      id: INFO_ID,
      contactEmail: body.contactEmail,
      helpInfo: body.helpInfo,
      helpInfoFr: body.helpInfoFr || '',
      directEmail: body.directEmail,
      homeTitle: body.homeTitle || 'Full Stack Developer & DevOps Developer',
      homeTitleFr: body.homeTitleFr || 'Développeur Full Stack & DevOps',
      homeDescription: body.homeDescription || 'Crafting scalable applications with cutting-edge technologies.',
      homeDescriptionFr: body.homeDescriptionFr || 'Création d’applications évolutives avec des technologies de pointe.',
      homeStack: body.homeStack || 'Next.js • Kubernetes • Modern Cloud Infrastructure',
      homeStackFr: body.homeStackFr || 'Next.js • Kubernetes • Infrastructure Cloud Moderne',
    },
  });
  return NextResponse.json({ success: true });
}
