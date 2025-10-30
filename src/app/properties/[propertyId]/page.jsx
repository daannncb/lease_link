import RepairForm from "@/components/RepairForm";
import TenantRepairsList from "@/components/TenantRepairsList";
import GetRepairsListLandlord from "@/components/GetRepairsListLandlord";
import PropertyView from "@/components/PropertyView";
import ImagePage from "@/components/ImageUploader";
import { db } from "@/utils/dbConnection";

export const metadata = {
  title: "Property Details, LeaseLink",
  description: "View property details, repairs, and submit new repair requests.",
  icons: { icon: "/logo.png" },
};

export default async function PropertyPage({ params }) {
  const propertyId = params.propertyId;

  // Fetch tenant info
  const resTenant = await db.query(
    `SELECT users.full_name, properties.address_line1, properties.address_line2, properties.city, properties.postcode, roles.id AS role_id
      FROM users
      JOIN roles ON users.id = roles.tenant_id
      JOIN properties ON roles.property_id = properties.id
      WHERE roles.property_id = $1`,
    [propertyId]
  );

  const tenantData = resTenant.rows[0] || {};
  const tenantName = tenantData.full_name || "Tenant";
  const propertyAddress = `
    ${tenantData.address_line1 || ""}, 
    ${tenantData.address_line2 || ""}, 
    ${tenantData.city || ""}, 
    ${tenantData.postcode || ""}
  `;
  const roleId = tenantData.role_id || null;

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-2xl font-bold">Property Details</h1>
        <PropertyView propertyId={propertyId} />
      </div>

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

      <div>
        <h1 className="text-2xl font-bold">Repairs (Tenant view)</h1>
        {roleId && <TenantRepairsList roleId={roleId} />}
      </div>

      <div>
        <h1 className="text-2xl font-bold">Repairs (Landlord view)</h1>
        <GetRepairsListLandlord landlordId={2} /> {/* I did this for testing only, we'll replace with actual logged-in landlord ID or clerk id */}
      </div>
    </div>
  );
}
