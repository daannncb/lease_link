"use client";

import { useTheme } from "@/components/reducerTheme";
import { postLandlordDetails } from "@/app/actions/landlordAction";

export default function CreateLandlord() {
    const { theme } = useTheme();

    return (
    <div
        className={`p-8 max-w-lg mx-auto my-16 rounded-2xl shadow-2xl backdrop-blur-md border transition-all duration-500 ${
        theme.mode === "light"
            ? "bg-white/70 border-(--color-sage-green)"
            : "bg-(--color-sage-green)/30 border-(--color-beige)"
        }`}
    >
    
        <h1
        className={`text-4xl font-bold mb-6 text-center tracking-wide drop-shadow-lg ${
            theme.text
        }`}
        >
        Create Landlord
        </h1>

    
        <form
        action={postLandlordDetails}
        className={`flex flex-col gap-6 p-6 rounded-xl transition-all duration-500 shadow-xl ${
            theme.mode === "light"
            ? "bg-white/40 border border-(--color-sage-green) shadow-[0_8px_32px_0_rgba(90,123,100,0.2)]"
            : "bg-(--color-sage-green)/20 border border-(--color-beige) shadow-[0_8px_32px_0_rgba(255,255,255,0.15)]"
        }`}
        >
    
        <div>
            <label
            htmlFor="fullName"
            className={`block mb-2 font-semibold ${
                theme.mode === "light"
                ? "text-(--color-sage-green)"
                : "text-(--color-beige)"
            }`}
            >
            Full Name
            </label>
            <input
            type="text"
            name="fullName"
            id="fullName"
            placeholder="Enter landlord&apos;s full name"
            className={`w-full p-3 rounded-lg border text-base shadow-inner focus:outline-none focus:ring-2 transition-all duration-300 placeholder-opacity-70 ${
                theme.mode === "light"
                ? "border-(--color-sage-green) bg-white text-(--color-sage-green) placeholder-(--color-sage-green) focus:ring-(--color-sage-green)"
                : "border-(--color-beige) bg-(--color-sage-green)/20 text-(--color-beige) placeholder-(--color-beige) focus:ring-(--color-beige)"
            }`}
            required
            />
        </div>

        <div>
            <label
            htmlFor="email"
            className={`block mb-2 font-semibold ${
                theme.mode === "light"
                ? "text-(--color-sage-green)"
                : "text-(--color-beige)"
            }`}
            >
            Email Address
            </label>
            <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter landlord&apos;s email"
            className={`w-full p-3 rounded-lg border text-base shadow-inner focus:outline-none focus:ring-2 transition-all duration-300 placeholder-opacity-70 ${
                theme.mode === "light"
                ? "border-(--color-sage-green) bg-white text-(--color-sage-green) placeholder-(--color-sage-green) focus:ring-(--color-sage-green)"
                : "border-(--color-beige) bg-(--color-sage-green)/20 text-(--color-beige) placeholder-(--color-beige) focus:ring-(--color-beige)"
            }`}
            required
            />
        </div>

    
        <button
            type="submit"
            className={`px-5 py-3 mt-2 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] ${
            theme.mode === "light"
                ? "bg-(--color-sage-green) text-(--color-beige) hover:opacity-90"
                : "bg-(--color-beige) text-(--color-sage-green) hover:opacity-80"
            }`}
        >
            Create Landlord
        </button>
        </form>
    </div>
    );
}
