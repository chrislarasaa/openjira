import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith('/api/v1/entries/')) {
        const id = request.nextUrl.pathname.replace('/api/v1/entries/', '')
        const checkMongoIDRegExp = new RegExp("^[0-9a-fA-F]{24}$")

        if (!checkMongoIDRegExp.test(id)) {
            const url = request.nextUrl.clone()
            url.pathname = '/api/v1/error-response/400'
            url.search = `?message=${id} is not a valid MongoID`
            return NextResponse.rewrite(url)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/api/v1/entries/:path*',
    ]
}