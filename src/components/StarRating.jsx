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
    <div className="flex gap-1">
        {[...Array(maxStars)].map((_, i) => {
        const value = i + 1;
        return (
            <FaStar
            key={value}
            size={28}
            className={`cursor-pointer transition-transform duration-200 ${
                value <= (hover || rating)
                ? "text-yellow-400 scale-110"
                : "text-gray-300"
            }`}
            onClick={() => handleClick(value)}
            onMouseEnter={() => setHover(value)}
            onMouseLeave={() => setHover(0)}
            />
        );
        })}
    </div>
    );
}
