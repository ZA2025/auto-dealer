import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const adminEmail = process.env.ADMIN_EMAIL; // Use the correct variable name

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    access_type: "offline",
                    prompt: "consent",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            if (user.email === adminEmail) {
                return true;
            }
            return "/login?error=AccessDenied";
        },
        async session({ session, token }) {
            session.user.isAdmin = token.email === adminEmail;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
            }
            return token;
        },
    },
    
};

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authOptions);
