import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Check for session cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('appSession');
    
    if (!sessionCookie || sessionCookie.value !== 'logged-in-user') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For demo purposes, return ADMIN role for the test user
    // In production, you'd look up the actual user in the database
    const mockUserId = 'auth0|test-user-id';
    
    try {
      let user = await prisma.user.findUnique({
        where: { auth0Id: mockUserId },
        select: { role: true },
      });

      if (!user) {
        // Create user if they don't exist
        user = await prisma.user.create({
          data: {
            auth0Id: mockUserId,
            email: 'nathan.w.roos@gmail.com',
            name: 'Nathan Roos',
            role: 'ADMIN', // Make the test user an admin
          },
          select: { role: true },
        });
      }

      return NextResponse.json({ role: user.role });
    } catch (dbError) {
      // If database is not available, return a default role
      console.log('Database not available, using default role');
      return NextResponse.json({ role: 'ADMIN' });
    }
  } catch (error) {
    console.error('Error fetching user role:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}