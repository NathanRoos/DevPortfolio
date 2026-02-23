import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { educationSchema } from '../../../lib/validators';


export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: {
        startDate: 'desc',
      },
      include: {
        translations: true
      }
    });
    return NextResponse.json(education);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = educationSchema.parse(body);

    const education = await prisma.education.create({
      data: {
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        translations: {
          create: [
            {
              language: 'en',
              degree: validatedData.en.degree,
              institution: validatedData.en.institution,
              description: validatedData.en.description,
            },
            {
              language: 'fr',
              degree: validatedData.fr.degree,
              institution: validatedData.fr.institution,
              description: validatedData.fr.description,
            }
          ]
        }
      },
      include: { translations: true }
    });

    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    console.error('Error creating education:', error);
    return NextResponse.json(
      { error: 'Failed to create education' },
      { status: 500 }
    );
  }
}
