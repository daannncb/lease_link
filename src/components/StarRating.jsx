"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarRating({ maxStars = 5, onRatingSelect, defaultRating = 0 }) {
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(defaultRating);

    const handleClick = (value) => {
    setRating(value);
    onRatingSelect(value);
    };

    return (
   <div
  className="flex gap-1 justify-center"
  aria-label="Select a star rating"
>
  {[...Array(maxStars)].map((_, i) => {
    const value = i + 1;
    const isActive = value <= (hover || rating);

    return (
        <span
        key={value}
        role="button"                
        tabIndex={0}                   // make it focusable
        aria-pressed={isActive}        // screen reader says “pressed” when selected
        onClick={() => handleClick(value)}
        onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") handleClick(value);
        }}
        onMouseEnter={() => setHover(value)}
        onMouseLeave={() => setHover(0)}
        className={`cursor-pointer transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage-green ${
            isActive ? "text-yellow-400 scale-110" : "text-gray-300"
        }`}
        aria-label={`${value} star${value > 1 ? "s" : ""}`}
        >
        <FaStar size={28} />
        </span>
    );
    })}
</div>

    );
}
