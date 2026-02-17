import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { experienceSchema } from '../../../lib/validators';

export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: {
        startDate: 'desc',
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
    
    // Validate request body
    // Convert date strings to Date objects for schema validation if needed,
    // but zod handles strings with .transform or coerce often.
    // Our schema accepts strings or dates.
    const validatedData = experienceSchema.parse(body);

    const experience = await prisma.experience.create({
      data: {
        ...validatedData,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      }
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
