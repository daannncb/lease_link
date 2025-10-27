"use server";
import { db } from "@/utils/dbConnection";

export async function getLandlordByRoleId(roleId) {
  const res = await db.query(
    `SELECT users.email AS email, users.full_name AS full_name
     FROM users
     JOIN roles ON roles.landlord_id = users.id
     WHERE roles.id = $1`,
    [roleId]
  );
  // console.log("landlord email query:", res);
  // console.log("landlord email query:: email :", res.rows[0].email);
  return res.rows[0];
}
