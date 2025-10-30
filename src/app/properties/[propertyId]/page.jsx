import RepairForm from "@/components/repairForm";
import TenantRepairsList from "@/components/TenantsRepairList";
import GetRepairsListLandlord from "@/components/GetRepairsListLandlord";
import PropertyView from "@/components/PropertyView";
import ImagePage from "@/components/ImageUploader";
import { db } from "@/utils/dbConnection";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


export const metadata = {
  title: "Property Details, LeaseLink",
  description: "View property details, repairs, and submit new repair requests.",
  icons: { icon: "/logo.png" },
};

export default async function PropertyPage({ params }) {
  const propertyId = (await params).propertyId;
  // Fetch tenant info
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();


  const dbUserResult = await db.query(
    `SELECT id, clerk_id, full_name, email 
      FROM users 
      WHERE clerk_id = $1`,
    [user.id]
  );

  const dbUser = dbUserResult.rows[0];

  if (!dbUser) {
    console.error("❌ User exists but not found:", user.id);
    throw new Error("User not found");
  }

  //  I'm thinking to Fetch tenant + landlord info for the property?
  const res = await db.query(
    `SELECT 
        users.id AS tenant_id,
        users.full_name AS tenant_name,
        properties.address_line1,
        properties.address_line2,
        properties.city,
        properties.postcode,
        properties.country,
        roles.id AS role_id,
        roles.landlord_id AS landlord_id
      FROM properties
      JOIN roles ON properties.id = roles.property_id
      LEFT JOIN users ON users.id = roles.tenant_id
      WHERE properties.id = $1`,
    [propertyId]
  );

  const propertyData = res.rows[0];

  if (!propertyData) {
    throw new Error("Property not found");
  }

  const tenantId = propertyData.tenant_id;
  const tenantName = propertyData.tenant_name || "Tenant";
  const roleId = propertyData.role_id;
  const landlordId = propertyData.landlord_id;

  const addressLine1 = propertyData.address_line1 || "";
  const addressLine2 = propertyData.address_line2 || "";
  const city = propertyData.city || "";
  const postcode = propertyData.postcode || "";
  const country = propertyData.country || "United Kingdom";

  const propertyAddress = `
    ${addressLine1}, 
    ${addressLine2}, 
    ${city}, 
    ${postcode}, 
    ${country}
  `;

  // we can see the user type
  const isTenant = dbUser.id === tenantId;
  const isLandlord = dbUser.id === landlordId;

  return (
    <div className="space-y-12 px-8 py-6">
      <div>
        <h1 className="text-2xl font-bold">Property Details</h1>
        <PropertyView propertyId={propertyId} />
      </div>

       {isTenant && (
        <div>
          <h1 className="text-2xl font-bold">Submit a Repair</h1>
          {roleId ? (
            <RepairForm
              roleId={roleId}
              propertyAddress={propertyAddress}
              tenantName={tenantName}
            />
          ) : (
            <p>Role not found for this property.</p>
          )}
          <ImagePage />
        </div>
      )}

      {isTenant && (
        <div>
          <h1 className="text-2xl font-bold">Your Repairs</h1>
          <TenantRepairsList roleId={roleId} />
        </div>
      )}

      {isLandlord && (
        <div>
          <h1 className="text-2xl font-bold">Repairs (Landlord View)</h1>
          <GetRepairsListLandlord landlordId={dbUser.id} />
        </div>
      )}
    </div>
  );
}