//
// mmiddleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { hasCookie } from 'cookies-next';

// This function can be marked `async` if using `await` inside
export function mmiddleware(request: NextRequest) {

    console.log(hasCookie('etr_token'))
    if (hasCookie('etr_token')) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/auth/login', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/account/:path*', '/tenant/:path*', '/property/:path*', '/community/:path*', '/messages/:path*'],
}

