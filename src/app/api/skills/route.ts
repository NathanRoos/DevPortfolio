import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { skillSchema } from '../../../lib/validators';

export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: {
        category: 'asc',
      }
    });
    
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = skillSchema.parse(body);

    const skill = await prisma.skill.create({
      data: validatedData
    });

    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    );
  }
}
