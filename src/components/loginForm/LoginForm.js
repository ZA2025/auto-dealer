"use client";
import React, { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const LoginForm = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const error = searchParams.get("error");
    console.log(session)
    useEffect(() => {
        if (status === "loading") return; // Don't run logic while session is loading

        console.log("Session status:", status);
        console.log(session)
        if (!session) {
            console.log("User is not authenticated. Redirecting to login...");
            return;
        }

        if (!session.user?.isAdmin) {
            console.log("User is not an admin. Redirecting to login with error...");
            router.replace("/login?error=AccessDenied");
            return;
        }

        console.log("Admin authenticated. Redirecting to home...");
        router.replace("/home"); // Redirect admins to home
    }, [session, status, router, pathname]);

    const handleSignIn = async () => {
        await signIn("google");
    };

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div>
            {error && <p className="error-message">Access Denied: You do not have permission to sign in.</p>}
            {session ? (
                <button className="loginButton" onClick={handleSignOut}>
                    Sign out
                </button>
            ) : (
                <button onClick={handleSignIn} className="loginButton">
                    <img src="/icons/google.svg" alt="Google icon" />
                    Sign in with Google
                </button>
            )}
        </div>
    );
};

export default LoginForm;
