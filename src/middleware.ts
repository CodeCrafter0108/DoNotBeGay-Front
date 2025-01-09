import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
    const path = new URL(request.url).pathname;

    console.debug('path: ', path);

    if (path === '/') {
        return NextResponse.redirect(new URL('/launcher', request.url));
    }

    try {
        return NextResponse.next();
    } catch (error) {
        console.log(error);
        return NextResponse.next();
    }
}

export const config = {
    matcher: ['/'],
};
