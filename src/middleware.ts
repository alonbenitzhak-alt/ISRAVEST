import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pauseMode = process.env.NEXT_PUBLIC_PAUSE_MODE === 'true';

  if (pauseMode) {
    const pathname = request.nextUrl.pathname;

    // Allow only home page and static assets
    const allowedPaths = ['/', '/_next', '/icon.svg', '/api/health'];
    const isAllowed = allowedPaths.some(path =>
      pathname === path || pathname.startsWith('/_next')
    );

    if (!isAllowed) {
      // Redirect everything else to home page
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files
    '/((?!_next/static|_next/image|favicon.ico|icon.svg|og-image.png).*)',
  ],
};
