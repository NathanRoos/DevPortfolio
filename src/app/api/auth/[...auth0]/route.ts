import { NextRequest, NextResponse } from 'next/server';

// This handles Auth0 authentication routes
export async function GET(request: NextRequest, { params }: { params: Promise<{ auth0: string[] }> }) {
  const { auth0 } = await params;
  const action = auth0[0]; // First segment after /api/auth/
  
  if (action === 'login') {
    const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const baseUrl = process.env.AUTH0_BASE_URL;

    if (!issuerBaseUrl || !clientId || !baseUrl) {
      console.error('Missing Auth0 configuration:', { issuerBaseUrl, clientId, baseUrl });
      return NextResponse.json({ error: 'Auth0 configuration missing' }, { status: 500 });
    }

    // Redirect to Auth0 login
    // Ensure domain doesn't have protocol to avoid duplication, then add https://
    const domain = issuerBaseUrl.replace(/^https?:\/\//, '');
    const loginUrl = `https://${domain}/authorize?` +
      `response_type=code&` +
      `client_id=${clientId}&` +
      `redirect_uri=${encodeURIComponent(baseUrl + '/api/auth/callback')}&` +
      `scope=openid profile email`;
    
    return NextResponse.redirect(loginUrl);
  }
  
  if (action === 'logout') {
    // Determine the return URL after logout
    const returnTo = process.env.AUTH0_BASE_URL;
    
    // Construct Auth0 logout URL
    const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
    
    // Ensure we have a valid domain without protocol
    const domain = issuerBaseUrl ? issuerBaseUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
    
    // Create the logout URL that clears Auth0 session and redirects back to your homepage
    // We explicitly use the /v2/logout endpoint which is the standard for clearing Auth0 sessions
    const logoutUrl = `https://${domain}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${encodeURIComponent(returnTo!)}&federated`;

    // Prepare the response (redirect to Auth0 logout)
    const response = NextResponse.redirect(logoutUrl);
    
    // Clear local session cookie
    response.cookies.delete('appSession');
    
    return response;
  }
  
  if (action === 'profile') {
    // Return user profile - simplified implementation
    // In production, you'd verify the session cookie and return actual user data
    const userProfile = {
      sub: 'auth0|test-user-id',
      name: 'Test User',
      email: 'nathan.w.roos@gmail.com',
      email_verified: true,
      picture: 'https://via.placeholder.com/150'
    };
    
    return NextResponse.json(userProfile);
  }
  
  if (action === 'callback') {
    // Handle Auth0 callback - simplified implementation
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    
    if (error) {
      return NextResponse.redirect(`${process.env.AUTH0_BASE_URL}?error=${encodeURIComponent(error)}`);
    }
    
    if (code) {
      // Simulate creating a session by setting a simple cookie
      const response = NextResponse.redirect(process.env.AUTH0_BASE_URL!);
      response.cookies.set('appSession', 'logged-in-user', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      return response;
    }
    
    return NextResponse.redirect(process.env.AUTH0_BASE_URL!);
  }
  
  return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}