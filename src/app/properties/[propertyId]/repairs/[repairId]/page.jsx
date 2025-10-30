//! dynamic route for displaying single repairs, navigated from list of properties
import { db } from "@/utils/dbConnection";
import StoredImageRenderer from "@/components/StoredImageRenderer";

export default async function ViewDynamicRepair({ params }) {
  const propertyId = (await params).propertyId;
  const repairId = (await params).repairId;

  //get repair info
  const repairRes = await db.query(
    `SELECT id, title, description, status, created_at FROM repairs WHERE id = $1`,
    [repairId]
  );

  const repairData = repairRes.rows[0];
  // console.log(repairData);
  //get comments info
  const commentRes = await db.query(
    `SELECT comments.id, comments.comment, users.full_name
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.repair_id = $1`,
    [repairId]
  );

  const commentData = commentRes.rows;

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-2xl font-bold">{repairData.title}</h1>
        <StoredImageRenderer />
        <p className="text-lg">{repairData.description}</p>
        <br></br>
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
        {commentData.map((comment) => {
          return (
            <div key={comment.id}>
              <p className="font-bold">{comment.full_name} said:</p>
              <p>{comment.comment}</p>
              <br></br>
            </div>
          );
        })}
      </div>
    </>
  );
}
