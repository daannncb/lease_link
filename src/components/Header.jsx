"use client";

import Image from "next/image";
import { useTheme } from "@/components/reducerTheme";
import { FaRegMoon } from "react-icons/fa";

export default function Header() {
    const { theme, dispatch } = useTheme();

    const isLight = theme.mode === "light";

    return (
    <header className={`${theme.headerFooterBg} shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
        <div className="flex items-center gap-2 text-(--color-beige) font-bold text-4xl">
            Lease
            <Image
            src="/logo.png"
            alt="Lease Link Logo"
            width={50}
            height={50}
            />
            Link
        </div>

        {/* Toggle icon */}
        <button
            onClick={() => dispatch({ type: "toggle" })}
            className="p-2 rounded hover:opacity-80 transition"
        >
            <FaRegMoon
            className={`w-8 h-8 transition-transform duration-300 hover:scale-110 ${
                isLight ? "text-(--color-beige)" : "text-(--color-beige)"
            }`}
            />
        </button>
        </div>
    </header>
    );
}
