import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

export async function GET() {
  try {
    const [projectCount, testimonialCount, messageCount, pendingTestimonials] = await Promise.all([
      prisma.project.count(),
      prisma.testimonial.count({ where: { status: 'APPROVED' } }),
      prisma.contactMessage.count(),
      prisma.testimonial.count({ where: { status: 'PENDING' } })
    ]);

    return NextResponse.json({
      projectCount,
      testimonialCount,
      messageCount,
      pendingTestimonials
    });
  } catch (error) {
    console.error('Database error:', error);
    
    // Fallback stats if database is not available
    return NextResponse.json({
      projectCount: 3,
      testimonialCount: 5,
      messageCount: 12,
      pendingTestimonials: 2
    });
  }
}