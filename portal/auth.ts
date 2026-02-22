import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        try {
          const user = await prisma.user.findUnique({
            where: { email },
            include: { organization: true },
          });

          if (!user || !user.hashedPassword) {
            return null;
          }

          const isValid = await compare(password, user.hashedPassword);

          if (!isValid) {
            return null;
          }

          // Track login activity
          const now = new Date();
          await prisma.user.update({
            where: { id: user.id },
            data: {
              lastLoginAt: now,
              currentSessionStart: now,
              lastActiveAt: now,
            },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            organizationId: user.organizationId,
            role: user.role,
          };
        } catch (error) {
          console.error('[auth] Error in authorize:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.organizationId = (user as any).organizationId;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).organizationId = token.organizationId;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  trustHost: true,
});
