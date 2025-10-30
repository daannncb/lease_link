import { db } from "@/utils/dbConnection";

export default async function FeedbackPage({ params }) {
  const propertyId = (await params).propertyId;

  // const res = await db.query(
  //   `SELECT * FROM feedback JOIN roles on feedback.role_id = roles.id WHERE roles.id = (SELECT id FROM roles WHERE roles.property_id = $1 AND roles.landlord_id IS NOT NULL)`,
  //   [propertyId]
  // );
  // I made changes here because I think we need to select needed fields only
  const res = await db.query(
    `SELECT feedback.id, feedback.comment, feedback.voting
   FROM feedback
   JOIN roles ON feedback.role_id = roles.id
   WHERE roles.property_id = $1 AND roles.landlord_id IS NOT NULL`,
    [propertyId]
  );

  const feedbackData = res.rows;
  console.log(feedbackData);

  //   FROM properties
  //     LEFT JOIN roles ON roles.property_id = properties.id
  //     WHERE roles.landlord_id = (
  //       SELECT id FROM users WHERE clerk_id = $1
  //     )

  return (
    <div>
      <h1 className="text-2xl font-bold">Hello</h1>
      {feedbackData.map((feedback) => {
        return (
          <div key={feedback.id}>
            <p>{feedback.comment}</p>
          </div>
        );
      })}
    </div>
  );
}
