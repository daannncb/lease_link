import { db } from "@/utils/dbConnection";
import PropertiesCarousel from "@/components/PropertiesCarousel";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import FeedbackDisplay from "@/components/FeedbackDisplay";
import Link from "next/link";

export default async function LandlordPropertiesView({ params }) {
  const userId = (await params).userId;
  const clerkIdRes = await db.query(
    `SELECT clerk_id FROM users WHERE id = $1`,
    [userId]
  );
  const clerkId = clerkIdRes.rows[0];

  const user = await currentUser();

  if (!user || user.id !== clerkId.clerk_id) {
    redirect("/unauthorized");
  }

  // I decided to use ORDER BY Desc here so the newest property will be on top.
  const res = await db.query(
    `
    SELECT 
      properties.id,
      properties.address_line1,
      properties.address_line2,
      properties.city,
      properties.postcode,
      properties.country,
      properties.description
    FROM properties
    LEFT JOIN roles ON roles.property_id = properties.id
    WHERE roles.landlord_id = (
      SELECT id FROM users WHERE clerk_id = $1
    )
      ORDER BY properties.id DESC
  `,
    [clerkId.clerk_id]
  );

  const properties = res.rows;

  if (properties.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">No properties found</div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold mb-6 text-slate-700 dark:text-beige">
        My Properties
      </h1>

      <div className="flex flex-col gap-12">
        {properties.map((property) => (
          <div
            key={property.id}
            className="p-6 rounded-xl shadow-md transition-colors duration-300 bg-white/70 border border-sage-green/50 dark:bg-sage-green/30 dark:border-beige"
          >
            {/* <h2 className="text-2xl font-semibold mb-2 text-sage-green dark:text-beige">
                {property.address_line1}
              </h2>
              <p className="text-gray-700 mb-4 dark:text-beige/90">
                {property.address_line2}, {property.city}, {property.postcode},{" "}
                {property.country}
              </p>
              <p className="text-gray-600 mb-4 dark:text-beige/80">
                {property.description}
              </p> */}
            <Link key={property.id} href={`/properties/${property.id}`}>
              <PropertiesCarousel properties={[property]} />
            </Link>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2 text-sage-green dark:text-beige">
                Tenant Feedback
              </h3>
              <Link href={`/properties/${property.id}/feedback`}>
                <FeedbackDisplay userId={userId} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
