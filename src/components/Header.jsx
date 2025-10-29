"use client";

import Image from "next/image";
import { useTheme } from "@/components/reducerTheme";
import { FaRegMoon } from "react-icons/fa";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  const { theme, dispatch } = useTheme();

  const isLight = theme.mode === "light";

  return (
    <header className={`${theme.headerFooterBg} shadow-2xl relative z-50`}>
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 text-(--color-beige) font-bold text-4xl shadow-lg drop-shadow-lg">
            Lease
            <Image
              src="/logo.png"
              alt="Lease Link Logo"
              width={50}
              height={50}
              className="shadow-xl rounded-full"
            />
            Link
          </div>
        </Link>
        <div className="flex align-middle gap-3">
          <SignOutButton
            className={`px-6 py-3 bg-(--color-beige) text-(--color-sage-green) font-medium rounded-lg shadow-lg hover:shadow-2xl transition duration-300`}
          />
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
      </div>
    </header>
  );
}
