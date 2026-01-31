import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { FailedLoginResponse, SuccessLoginResponse } from "@/interfaces"
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { 'content-type': 'application/json' }
                })
                const payLoad: SuccessLoginResponse | FailedLoginResponse = await response.json()
                if (response.ok && 'token' in payLoad) {
                    return {
                        id: payLoad.user.email,
                        user: payLoad.user,
                        token: payLoad.token
                    } as any
                } else {
                    throw new Error(payLoad.message || "Login failed")
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = (user as any).user;
                token.token = (user as any).token;
                // استخراج الـ ID من كائن اليوزر وتخزينه في الـ token مباشرة
                token.sub = (user as any).user._id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.user = token.user as any;
                (session as any).token = token.token;
                // ربط الـ ID بالسيشن لتقرأه صفحة allorders
                (session.user as any).id = token.sub;
            }
            return session;
        },
    },
    pages: {
        signIn: '/login',
        error: '/login'
    },
    secret: process.env.NEXTAUTH_SECRET,
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }