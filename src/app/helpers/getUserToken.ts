import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export default async function getUserToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const token = cookieStore.get('next-auth.session-token')?.value;
    if (!token) return null;
    const decoded = await decode({
        token: token,
        secret: process.env.NEXTAUTH_SECRET!
    });
    return decoded?.token ? String(decoded.token) : null;
}