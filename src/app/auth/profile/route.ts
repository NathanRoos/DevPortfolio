import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    // Check for session cookie
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('appSession');
    
    if (!sessionCookie || sessionCookie.value !== 'logged-in-user') {
      // Return null instead of 401 to avoid console errors when user is simply not logged in
      return NextResponse.json(null);
    }

    // Return user profile - this is what useUser expects
    const userProfile = {
      sub: 'auth0|test-user-id',
      name: 'Nathan Roos',
      email: 'nathan.w.roos@gmail.com',
      email_verified: true,
      picture: 'https://via.placeholder.com/150',
      updated_at: new Date().toISOString()
    };
    
    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}