"use server";

import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function postLandlordDetails(formData) {
  const userData = await currentUser();
  const clerkId = userData.id;
  const fullName = formData.get("fullName");
  const email = formData.get("email");

  if (!fullName || !email) return;

  try {
    await db.query(
      `UPDATE users SET full_name = $1, email = $2 WHERE clerk_id = $3`,
      [fullName, email, clerkId]
    );

    console.log("✅ Landlord created:", fullName);
  } catch (error) {
    console.error("❌ Failed to create landlord:", error);
  }
  redirect("/properties/create");
}
