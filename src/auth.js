import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Define admin email for restricted access
const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

// Configure NextAuth
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
            // Only allow sign-ins from the admin email
            if (user.email !== adminEmail) {
                return false; // Reject users who aren't the admin
            }
            return true;
        },
    },
};

// Export required objects
export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authOptions);
