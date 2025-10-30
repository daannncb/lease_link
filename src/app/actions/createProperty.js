"use server";

import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createPropertyAction(formData) {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const clerkId = user.id;

  const landlordRes = await db.query(
    `SELECT id FROM users WHERE clerk_id = $1`,
    [clerkId]
  );
  if (landlordRes.rows.length === 0) throw new Error("Landlord not found");

  const landlordId = landlordRes.rows[0].id;

  const address_line1 = formData.get("address_line1");
  const address_line2 = formData.get("address_line2");
  const city = formData.get("city");
  const postcode = formData.get("postcode");
  const country = formData.get("country") || "United Kingdom";
  const description = formData.get("description");

  const propertyInsert = await db.query(
    `INSERT INTO properties (address_line1, address_line2, city, postcode, country, description)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id`,
    [address_line1, address_line2, city, postcode, country, description]
  );

  const propertyId = propertyInsert.rows[0].id;

  await db.query(
    `INSERT INTO roles (property_id, landlord_id)
    VALUES ($1, $2)`,
    [propertyId, landlordId]
  );
  redirect(`/user/${landlordId}/properties`);

  return { success: true, propertyId };
}
