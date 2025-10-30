"use server";

import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";

export async function setUserRole(role) {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

    const clerkId = user.id;

    
    let email =
    user.email_addresses?.[0]?.email_address || user.email || null;

    if (!email) {
    throw new Error("User email is missing, cannot create record");
    }

    
    let userRecord = await db.query(
    `SELECT id FROM users WHERE clerk_id = $1`,
    [clerkId]
    );

    let userId;
    if (userRecord.rowCount === 0) {
        
    const insertUser = await db.query(
        `INSERT INTO users (clerk_id, full_name, email) VALUES ($1, $2, $3) RETURNING id`,
        [clerkId, user.full_name || "Unknown", email]
    );
    userId = insertUser.rows[0].id;
    } else {
    userId = userRecord.rows[0].id;
    }


    await db.query(
    `ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT;`
    );

  // Update role
    await db.query(
    `UPDATE users SET role = $1 WHERE id = $2`,
    [role, userId]
    );

    return { success: true };
}
