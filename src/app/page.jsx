"use client";

import { SignInButton, SignUpButton } from "@clerk/nextjs";
import ThemedSection from "@/components/ThemedSection";
import Image from "next/image";
import { useTheme } from "@/components/reducerTheme";

export default function HomePage() {
  const { theme } = useTheme();

  return (
    <ThemedSection className="min-h-screen p-6">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full max-w-7xl mx-auto gap-12 mt-16 md:mt-24">
        <div className="md:w-1/2 flex justify-center md:justify-start">
          <div
            className={`relative w-full max-w-md md:max-w-lg p-8 rounded-3xl
            ${
              theme.mode === "light"
                ? "bg-white/20 border-white/40"
                : "bg-gray-900/30 border-gray-200/30"
            }
            border-2 backdrop-blur-lg shadow-2xl hover:shadow-3xl transition-all duration-500 flex flex-col gap-6`}
          >
            <h1
              className={`text-5xl md:text-6xl font-bold leading-tight ${theme.text} drop-shadow-lg`}
            >
              Welcome to <span className={theme.text}>LeaseLink!</span>
            </h1>
            <p className={`text-lg md:text-xl ${theme.text} drop-shadow-md`}>
              Seamless communication for landlords and tenants.
            </p>

            <div className="flex flex-col gap-4 md:flex-row">
              <SignInButton>
                <button
                  className={`px-6 py-3 ${theme.headerFooterBg} ${theme.headerFooterText} font-medium rounded-lg shadow-lg hover:shadow-2xl transition duration-300`}
                >
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button
                  className={`px-6 py-3 ${theme.headerFooterBg} ${theme.headerFooterText} font-medium rounded-lg shadow-lg hover:shadow-2xl transition duration-300`}
                >
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center md:justify-end py-16 relative">
          <div
            className={`relative w-full max-w-md md:max-w-xl rounded-3xl p-3
            ${
              theme.mode === "light"
                ? "bg-white/20 border-white/40"
                : "bg-gray-900/30 border-gray-200/30"
            }
            border-2 backdrop-blur-lg shadow-2xl hover:shadow-3xl transition-all duration-500`}
          >
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-2 left-2 w-20 h-1 bg-white/30 rotate-12 animate-pulse"></div>
              <div className="absolute bottom-3 right-4 w-16 h-1 bg-white/20 rotate-45 animate-pulse"></div>
              <div className="absolute top-10 right-0 w-24 h-1 bg-white/25 rotate-6 animate-pulse"></div>
            </div>

            <Image
              src="/homes.jpeg"
              alt="LeaseLink home image"
              width={850}
              height={600}
              className="object-cover w-full h-full rounded-3xl"
            />
          </div>
        </div>
      </div>
    </ThemedSection>
  );
}
