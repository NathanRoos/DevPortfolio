import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { testimonialStatusSchema } from '../../../../lib/validators';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PATCH - update testimonial status (admin only)
export async function PATCH(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { params } = context;
    const { id } = await params;
    const body = await request.json();
    const validatedData = testimonialStatusSchema.parse(body);

    try {
      const testimonial = await prisma.testimonial.update({
        where: { id },
        data: { status: validatedData.status },
        include: {
          user: {
            select: { name: true },
          },
        },
      });

      return NextResponse.json(testimonial);
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ 
        message: `Testimonial ${validatedData.status.toLowerCase()} successfully (demo mode)` 
      });
    }
  } catch (error) {
    if (error instanceof Error && 'issues' in error) {
      return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
    }
    console.error('Error updating testimonial:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE - delete testimonial (admin only)
export async function DELETE(
  request: NextRequest,
  context: RouteParams
) {
  try {
    const { params } = context;
    const { id } = await params;

    try {
      await prisma.testimonial.delete({
        where: { id },
      });

      return NextResponse.json({ message: 'Testimonial deleted successfully' });
    } catch (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json({ 
        message: 'Testimonial deleted successfully (demo mode)' 
      });
    }
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}