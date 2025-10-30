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
  description:
    "View property details, repairs, and submit new repair requests.",
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
    `SELECT id FROM roles WHERE property_id = $1 AND landlord_id IS NOT NULL`,
    [propertyId]
  );

  //get tenant info for emails to pass as param
  const res2 = await db.query(
    `SELECT users.full_name, properties.address_line1, properties.address_line2, properties.city, properties.postcode 
    FROM users 
    JOIN roles ON users.id = roles.tenant_id 
    JOIN properties ON roles.property_id = properties.id 
    WHERE roles.property_id = $1 AND tenant_id IS NOT NULL`,
    [propertyId]
  );

  const tenantData = res2.rows[0];
  const tenantName = tenantData.full_name;
  console.log(tenantData);
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
    <>
      <div className="flex flex-col px-6">
        <h1 className="text-2xl font-bold border-b">PROPERTY VIEW:</h1>
        <PropertyView propertyId={propertyId} />
        <GetRepairsListProperties propertyId={propertyId} />
        <h1 className="text-4xl font-bold border-b">ADD NEW REPAIR:</h1>
        <RepairForm
          className="text-4xl md-4 font-bold"
          roleId={roleId}
          propertyAddress={propertyAddress}
          tenantName={tenantName}
        />
        <ImagePage className="border-color #5f6b66 shadow-md h-24 w-24" />
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