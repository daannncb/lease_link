"use server";

import { db } from "@/utils/dbConnection";

export async function postLandlordDetails(formData) {
    const fullName = formData.get("fullName");
    const email = formData.get("email");

    if (!fullName || !email) return;

    try {
    await db.query(
        `INSERT INTO landlords (full_name, email) VALUES ($1, $2)`,
        [fullName, email]
    );

    console.log("✅ Landlord created:", fullName);
    } catch (error) {
    console.error("❌ Failed to create landlord:", error);
    }
}
