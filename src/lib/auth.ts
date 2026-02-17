// Simplified Auth0 integration for current package version
// In production, upgrade to a version with full App Router support

import { cookies } from 'next/headers';

export { useUser } from '@auth0/nextjs-auth0';
export { Auth0Provider as UserProvider } from '@auth0/nextjs-auth0';

// Simplified session check
export async function getSession() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('appSession');
    
    if (!sessionCookie || sessionCookie.value !== 'logged-in-user') {
      return null;
    }
    
    // Return a mock session - in production you'd decode and verify the JWT
    return {
      user: {
        sub: 'auth0|test-user-id',
        name: 'Test User',
        email: 'nathan.w.roos@gmail.com',
        email_verified: true,
        picture: 'https://via.placeholder.com/150'
      }
    };
  } catch (error) {
    return null;
  }
}

export type User = {
  sub?: string;
  name?: string;
  email?: string;
  picture?: string;
  [key: string]: any;
};