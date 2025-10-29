"use client";

import { useState, useTransition } from "react";
import { submitFeedback } from "@/app/actions/submitFeedback";
import StarRating from "@/StarRating";

export default function FeedbackForm({ roleId }) {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
        await submitFeedback({ roleId, comment, rating });
        setComment("");
        setRating(0);
        alert("Thanks for your feedback!");
    });
    };

    return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
        <h1 className="text-xl font-semibold text-slate-700">Leave Feedback</h1>

        <StarRating onRatingSelect={setRating} defaultRating={rating} />

        <textarea
        className="w-full border rounded-md p-2 text-gray-700"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        />

        <button
        type="submit"
        disabled={isPending}
        className="bg-(--color-sage-green) text-(--color-beige) px-4 py-2 rounded hover:opacity-90 transition"
        >
        {isPending ? "Submitting..." : "Submit Feedback"}
        <div
    aria-live="polite"
    className="mt-2 text-sm text-gray-700 dark:text-beige"
    >
    {message}
    </div>
        </button>
    </form>
    );
}
