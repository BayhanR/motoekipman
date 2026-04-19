import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { pathname } = req.nextUrl

    if (pathname.startsWith('/hesabim')) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL('/giris', req.nextUrl))
        }
    }

    if (pathname.startsWith('/admin')) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL('/giris', req.nextUrl))
        }
        const role = (req.auth?.user as any)?.role
        if (role !== 'ADMIN' && role !== 'SUPERADMIN') {
            return NextResponse.redirect(new URL('/hesabim', req.nextUrl))
        }
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
