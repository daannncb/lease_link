import { FaStar } from "react-icons/fa";

export default function FeedbackDisplay({ feedback }) {
    return (
    <div className="space-y-4">
        {feedback.map((feedback) => (
        <div key={feedback.id} className="bg-white border rounded p-4 shadow">
            <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
                <FaStar
                key={i}
                className={`${
                    i < feedback.voting ? "text-yellow-400" : "text-gray-300"
                }`}
                />
            ))}
            </div>
            <p className="text-gray-700">{feedback.comment}</p>
            <small className="text-gray-500">{new Date(fb.created_at).toLocaleDateString()}</small>
        </div>
        ))}
    </div>
    );
}
