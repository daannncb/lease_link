"use server";
import { db } from "@/utils/dbConnection";

export async function submitFeedback({ roleId, comment, rating }) {
    if (rating < 0 || rating > 5) throw new Error("Invalid rating");

    const result = await db.query(
    `INSERT INTO feedback (role_id, comment, voting)
    VALUES ($1, $2, $3)
    RETURNING id`,
    [roleId, comment, rating]
    );

    return result.rows[0];
}
