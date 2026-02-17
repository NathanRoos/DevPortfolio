import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // For now, just allow all admin routes - we'll handle auth in the AdminGuard component
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};