"use client";

import { useState, useTransition } from "react";
import { useTheme } from "@/components/reducerTheme";
import { createPropertyAction } from "@/app/actions/createProperty";

export default function CreateProperty() {
  const { theme } = useTheme();
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData) => {
    startTransition(async () => {
      try {
        const result = await createPropertyAction(formData);

        if (result.success) {
          setMessage("✅ Property added successfully!");
        } else {
          setMessage("❌ Something went wrong.");
        }
      } catch (err) {
        console.error(err);
        setMessage("❌ Failed to add property.");
      }
    });
  };

  return (
    <div
      className={`max-w-2xl mx-auto my-12 p-8 rounded-2xl border shadow-xl backdrop-blur-md transition-all duration-500
        ${
          theme.mode === "light"
            ? "bg-white/70 border-(--color-sage-green) shadow-[0_8px_32px_0_rgba(90,123,100,0.2)]"
            : "bg-(--color-sage-green)/30 border-(--color-beige) shadow-[0_8px_32px_0_rgba(255,255,255,0.15)]"
        }`}
    >
      <h1
        className={`text-3xl font-bold mb-6 text-center drop-shadow-lg ${
          theme.mode === "light"
            ? "text-(--color-sage-green)"
            : "text-(--color-beige)"
        }`}
      >
        Add a New Property
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          handleSubmit(formData, e.target);
        }}
        className="space-y-4"
      >
        <input
          name="address_line1"
          placeholder="Address Line 1"
          required
          className={`w-full p-3 rounded-lg border shadow-inner focus:outline-none focus:ring-2 transition-all duration-300 placeholder-opacity-70 ${
            theme.mode === "light"
              ? "border-(--color-sage-green) bg-white text-(--color-sage-green) placeholder-(--color-sage-green) focus:ring-(--color-sage-green)"
              : "border-(--color-beige) bg-(--color-sage-green)/20 text-(--color-beige) placeholder-(--color-beige) focus:ring-(--color-beige)"
          }`}
        />

        <input
          name="address_line2"
          placeholder="Address Line 2"
          className={`w-full p-3 rounded-lg border shadow-inner focus:outline-none focus:ring-2 transition-all duration-300 placeholder-opacity-70 ${
            theme.mode === "light"
              ? "border-(--color-sage-green) bg-white text-(--color-sage-green) placeholder-(--color-sage-green) focus:ring-(--color-sage-green)"
              : "border-(--color-beige) bg-(--color-sage-green)/20 text-(--color-beige) placeholder-(--color-beige) focus:ring-(--color-beige)"
          }`}
        />

        <input
          name="city"
          placeholder="City"
          required
          className={`w-full p-3 rounded-lg border shadow-inner focus:outline-none focus:ring-2 transition-all duration-300 placeholder-opacity-70 ${
            theme.mode === "light"
              ? "border-(--color-sage-green) bg-white text-(--color-sage-green) placeholder-(--color-sage-green) focus:ring-(--color-sage-green)"
              : "border-(--color-beige) bg-(--color-sage-green)/20 text-(--color-beige) placeholder-(--color-beige) focus:ring-(--color-beige)"
          }`}
        />

        <input
          name="postcode"
          placeholder="Postcode"
          required
          className={`w-full p-3 rounded-lg border shadow-inner focus:outline-none focus:ring-2 transition-all duration-300 placeholder-opacity-70 ${
            theme.mode === "light"
              ? "border-(--color-sage-green) bg-white text-(--color-sage-green) placeholder-(--color-sage-green) focus:ring-(--color-sage-green)"
              : "border-(--color-beige) bg-(--color-sage-green)/20 text-(--color-beige) placeholder-(--color-beige) focus:ring-(--color-beige)"
          }`}
        />

        <input
          name="country"
          placeholder="Country (default UK)"
          className={`w-full p-3 rounded-lg border shadow-inner focus:outline-none focus:ring-2 transition-all duration-300 placeholder-opacity-70 ${
            theme.mode === "light"
              ? "border-(--color-sage-green) bg-white text-(--color-sage-green) placeholder-(--color-sage-green) focus:ring-(--color-sage-green)"
              : "border-(--color-beige) bg-(--color-sage-green)/20 text-(--color-beige) placeholder-(--color-beige) focus:ring-(--color-beige)"
          }`}
        />

        <textarea
          name="description"
          placeholder="Property description (optional)"
          className={`w-full p-3 rounded-lg border shadow-inner focus:outline-none focus:ring-2 transition-all duration-300 placeholder-opacity-70 resize-none h-28 ${
            theme.mode === "light"
              ? "border-(--color-sage-green) bg-white text-(--color-sage-green) placeholder-(--color-sage-green) focus:ring-(--color-sage-green)"
              : "border-(--color-beige) bg-(--color-sage-green)/20 text-(--color-beige) placeholder-(--color-beige) focus:ring-(--color-beige)"
          }`}
        ></textarea>

        <button
          type="submit"
          disabled={isPending}
          className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] ${
            theme.mode === "light"
              ? "bg-(--color-sage-green) text-(--color-beige) hover:opacity-90"
              : "bg-(--color-beige) text-(--color-sage-green) hover:opacity-80"
          }`}
        >
          {isPending ? "Creating..." : "Add Property"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center font-medium drop-shadow-md ${
            theme.mode === "light"
              ? "text-(--color-sage-green)"
              : "text-(--color-beige)"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
