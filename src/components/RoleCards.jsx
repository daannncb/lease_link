"use client";

import { useState } from "react";
import { setUserRole } from "@/app/actions/SetUserRole";
import { useRouter } from "next/navigation";

export default function RoleCards() {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);
    const [message, setMessage] = useState("");

    const handleClick = async (role) => {
    setIsPending(true);
    try {
        await setUserRole(role);
        setMessage(`You are now set as a ${role}! Redirecting...`);
        setTimeout(() => {
        if (role === "tenant") {
        router.push("/create-tenant");
        } else if (role === "landlord") {
        router.push("/create-property");
        }
    }, 800);
    } catch (err) {
        setMessage("Something went wrong. Please try again.");
        console.error(err);
    } finally {
        setIsPending(false);
    }
    };

    return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {["landlord", "tenant"].map((role) => (
        <div
            key={role}
            onClick={() => handleClick(role)}
            className="cursor-pointer p-6 rounded-3xl shadow-2xl bg-blur border-2 border-white/20 dark:border-gray-700/40 hover:scale-105 transition-transform duration-300"
        >
            <h2 className="text-2xl font-bold mb-2 text-heading">
            {role === "landlord" ? "🏠 I am a Landlord" : "🗝️ I am a Tenant"}
            </h2>
            <p className="text-body">
            {role === "landlord"
                ? "Manage properties, view tenant feedback, and track repairs."
                : "Find your rental, submit repair requests, and leave feedback."}
            </p>
        </div>
        ))}

        {message && (
        <div
            aria-live="polite"
            className="col-span-full mt-4 text-center text-heading"
        >
            {message}
        </div>
        )}
        {isPending && (
        <div className="col-span-full mt-2 text-center text-body">Submitting...</div>
        )}
    </div>
    );
}
