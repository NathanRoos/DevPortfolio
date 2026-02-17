import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.hobby.delete({
      where: {
        id: id
      }
    });

    return NextResponse.json({ message: 'Hobby deleted successfully' });
  } catch (error) {
    console.error('Error deleting hobby:', error);
    return NextResponse.json(
      { error: 'Failed to delete hobby' },
      { status: 500 }
    );
  }
}
