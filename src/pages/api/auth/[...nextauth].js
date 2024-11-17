import Register from '@/pages/register'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { signIn } from 'next-auth/react'

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    jwt: {
        encryption: true,
    },
    secret: process.env.NEXT_PUBLIC_JWT_SECRET,
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (profile) {
                token.given_name = profile.given_name
                token.family_name = profile.family_name
            }
            return token
        },
        async session({ session, token, user }) {
            if (session.user) {
                session.user.family_name = token.family_name
                session.user.given_name = token.given_name
            }

            return session
        },
    },
})
