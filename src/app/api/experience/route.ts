import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { experienceSchema } from '../../../lib/validators';

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: {
        startDate: 'desc',
      },
      include: {
        translations: true
      }
    });
    return NextResponse.json(experience);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = experienceSchema.parse(body);

    const experience = await prisma.experience.create({
      data: {
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        location: validatedData.location,
        translations: {
          create: [
            {
              language: 'en',
              position: validatedData.en.position,
              company: validatedData.en.company,
              description: validatedData.en.description,
            },
            {
              language: 'fr',
              position: validatedData.fr.position,
              company: validatedData.fr.company,
              description: validatedData.fr.description,
            }
          ]
        }
      },
      include: { translations: true }
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error('Error creating experience:', error);
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    );
  }
}
