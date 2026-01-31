'use server'

import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export default async function getUserToken(): Promise<string | null> {
    const cookieStore = await cookies();

    const sessionToken =
        cookieStore.get('__Secure-next-auth.session-token')?.value ||
        cookieStore.get('next-auth.session-token')?.value;

    if (!sessionToken) return null;

    const decoded = await decode({
        token: sessionToken,
        secret: process.env.NEXTAUTH_SECRET!
    });

    return decoded?.token ? String(decoded.token) : null;
}
