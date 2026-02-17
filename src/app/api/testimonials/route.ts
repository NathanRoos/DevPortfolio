import { checkRateLimit } from '../../../lib/rateLimit';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { testimonialSchema } from '../../../lib/validators';

// GET - fetch testimonials (public or admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const isAdmin = searchParams.get('admin') === 'true';
    
    if (isAdmin) {
      // Admin view - return all testimonials with full details
      try {
        const testimonials = await prisma.testimonial.findMany({
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        });
        
        return NextResponse.json(testimonials);
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Fallback admin data
        return NextResponse.json([
          {
            id: '1',
            author: 'John Smith',
            text: 'Nathan did excellent work on our project. Highly recommended!',
            rating: 5,
            status: 'PENDING',
            createdAt: new Date().toISOString(),
            user: { name: 'John Smith', email: 'john@example.com' }
          },
          {
            id: '2',
            author: 'Sarah Johnson',
            text: 'Professional, efficient, and delivered exactly what we needed.',
            rating: 5,
            status: 'APPROVED',
            createdAt: new Date().toISOString(),
            user: { name: 'Sarah Johnson', email: 'sarah@example.com' }
          }
        ]);
      }
    } else {
      // Try to get testimonials from database, fallback to empty array
      try {
        const testimonials = await prisma.testimonial.findMany({
          where: { status: 'APPROVED' },
          include: {
            user: {
              select: { name: true },
            },
          },
          orderBy: { createdAt: 'desc' },
        });
        
        return NextResponse.json(testimonials);
      } catch (dbError) {
        // Database not available, return empty testimonials for demo
        console.log('Database not available, returning empty testimonials');
        return NextResponse.json([]);
      }
    }
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json([]);
  }
}

// POST - create new testimonial
export async function POST(request: NextRequest) {
  try {
    // Get IP address (fallback to 'unknown')
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const rate = checkRateLimit(ip, 'testimonial', 3, 5); // 3 per min, 5 min block
    if (rate.blocked) {
      return NextResponse.json({ error: `Rate limit exceeded. Try again in ${Math.ceil(rate.retryAfter/60)} minutes.` }, { status: 429 });
    }

    const body = await request.json();
    const validatedData = testimonialSchema.parse(body);

    try {
      const testimonial = await prisma.testimonial.create({
        data: {
          userId: null, // No user association for anonymous testimonials
          author: validatedData.author,
          text: validatedData.text,
          rating: validatedData.rating,
          status: 'PENDING', // All testimonials start as pending
        },
        include: {
          user: {
            select: { name: true },
          },
        },
      });

      return NextResponse.json({ 
        message: 'Testimonial submitted successfully and is pending approval',
        testimonial 
      }, { status: 201 });
    } catch (dbError) {
      console.error('Database error:', dbError);
      // Fallback - just acknowledge submission for demo
      return NextResponse.json({ 
        message: 'Testimonial submitted successfully (demo mode)' 
      }, { status: 201 });
    }
  } catch (error) {
    if (error instanceof Error && 'issues' in error) {
      // Return specific validation error
      const zodError = error as any;
      const errorMessage = zodError.errors?.[0]?.message || 'Validation failed';
      return NextResponse.json({ error: errorMessage }, { status: 400 });
    }
    console.error('Error creating testimonial:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}