"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const LoginForm = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!session) return; // Avoid running logic if the session isn't loaded

        if (session?.user?.email) {
            console.log("Redirecting to /home");
            router.push("/home");
        } else if (pathname !== "/") {
            router.push("/");
        }
    }, [session, router, pathname]);

    const handleSignIn = async () => {
        await signIn("google");
    };

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <div>
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