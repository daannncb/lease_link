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
  return res.rows[0];
}
