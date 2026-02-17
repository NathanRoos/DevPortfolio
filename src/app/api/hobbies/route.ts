import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { hobbySchema } from '../../../lib/validators';

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
    const body = await request.json();
    const validatedData = hobbySchema.parse(body);

    const hobby = await prisma.hobby.create({
      data: validatedData
    });

    return NextResponse.json(hobby, { status: 201 });
  } catch (error) {
    console.error('Error creating hobby:', error);
    return NextResponse.json(
      { error: 'Failed to create hobby' },
      { status: 500 }
    );
  }
}
