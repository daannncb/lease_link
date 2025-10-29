//! dynamic route for displaying single repairs, navigated from list of properties
import { db } from "@/utils/dbConnection";
import StoredImageRenderer from "@/components/StoredImageRenderer";

export default async function ViewDynamicRepair({ params }) {
  const propertyId = (await params).propertyId;
  const repairId = (await params).repairId;

  //get repair info
  const repairRes = await db.query(
    `SELECT * FROM repairs WHERE id = ${repairId}`
  );
  const repairData = repairRes.rows[0];
  // console.log(repairData);
  //get comments info
  const commentRes = await db.query(
    `SELECT * FROM repairs JOIN comments on repairs.id = comments.repair_id JOIN users ON comments.user_id = users.id WHERE repairs.id = $1`,
    [repairId]
  );
  const commentData = commentRes.rows;

  return (
    <>
      <div>
        <h1>{repairData.title}</h1>
        <StoredImageRenderer />
        <p>{repairData.description}</p>
        <br></br>
      </div>
      <div>
        {commentData.map((comment) => {
          return (
            <div key={comment.id}>
              <p>{comment.full_name} said:</p>
              <p>{comment.comment}</p>
              <br></br>
            </div>
          );
        })}
      </div>
    </>
  );
}
