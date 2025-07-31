import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // อนุญาตให้เข้าถึงหน้า login ได้เสมอ
  if (pathname === '/login') {
    return NextResponse.next();
  }

  // ตรวจสอบ authentication สำหรับหน้าอื่นๆ
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value;
  
  if (!isAuthenticated) {
    // ถ้าไม่ได้ authenticate ให้ redirect ไปหน้า login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}; 