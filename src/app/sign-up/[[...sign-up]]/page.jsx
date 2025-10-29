"use client";

import { SignUp } from "@clerk/nextjs";
import { useTheme } from "@/components/reducerTheme";

export default function SignUpPage() {
    const { theme } = useTheme();

    return (
    <main
        className={`${theme.bg} ${theme.text} min-h-screen flex flex-col items-center justify-center px-4 transition-colors duration-500`}
    >
        <div className="absolute inset-0 bg-linear-to-br from-(--color-sage-green)/20 to-(--color-beige)/20 backdrop-blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white/20 dark:bg-(--color-sage-green)/30 backdrop-blur-md border border-white/30 flex flex-col items-center text-center">
        <h1 className="text-4xl font-bold mb-4 drop-shadow-md">
            Join LeaseLink Today
        </h1>

        <p className="mb-6 text-lg opacity-90 font-medium">
            Create your account and simplify your renting and communication.
        </p>

        <div className="w-full flex justify-center">
            <SignUp />
        </div>
        </div>
    </main>
    );
}
