import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { educationSchema } from '../../../lib/validators';

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: {
        startDate: 'desc',
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
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      }
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
