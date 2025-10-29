import { FaStar } from "react-icons/fa";
import { db } from "@/utils/dbConnection";

export default async function FeedbackDisplay({ userId }) {
  const res = await db.query(
    `SELECT * FROM feedback JOIN roles on feedback.role_id = roles.id WHERE roles.landlord_id = $1`,
    [userId]
  );
  const feedback = res.rows;
  console.log(feedback);
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
          <small className="text-gray-500">
            {new Date(feedback.created_at).toLocaleDateString()}
          </small>
        </div>
      ))}
    </div>
  );
}
