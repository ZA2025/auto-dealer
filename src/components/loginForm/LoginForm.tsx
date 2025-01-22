"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { use, useEffect } from "react";

const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

const LoginForm = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!session) return; // Avoid running logic if the session isn't loaded

        if (session?.user?.email === adminEmail && pathname !== "/home") {
            console.log("Redirecting to /home");
            router.push("/home");
        } else if (session?.user?.email !== adminEmail && pathname !== "/") {
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
                session?.user?.email === adminEmail ? (
                    <button className="loginButton" onClick={handleSignOut}>
                        <img src="/icons/google.svg" alt="Google icon" />
                        Sign out
                    </button>
                ) : (
                    <>
                        <p>Access Denied: You do not have permission to sign in.</p>
                        <button className="loginButton" onClick={handleSignIn}>
                            <img src="/icons/google.svg" alt="Google icon" />
                            Sign in with Google
                        </button>
                    </>
                )
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