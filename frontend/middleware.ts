import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const { pathname } = req.nextUrl;

	// Allow requests for static assets or API
	if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
		return NextResponse.next();
	}

	// Allow access to auth page if the user is not authenticated
	if (!token && pathname === '/auth') {
		return NextResponse.next();
	}

	// Redirect unauthenticated users to the auth page
	if (!token) {
		return NextResponse.redirect(new URL('/auth', req.url));
	}

	// Redirect authenticated users from auth page to home
	if (token && pathname === '/auth') {
		return NextResponse.redirect(new URL('/', req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/:path*'],
};
