import RepairForm from "@/components/repairForm";
import { db } from "@/utils/dbConnection";
import GetRepairsListLandlord from "@/components/GetRepairsListLandlord";
import PropertyView from "@/components/PropertyView";
import GetRepairsListProperties from "@/components/GetRepairListProperties";
import ImagePage from "@/components/ImageUploader";

export const metadata = {
  title: "Property Details, LeaseLink",
  description:
    "View property details, repairs, and submit new repair requests.",
  icons: { icon: "/logo.png" },
};

export default async function PropertyPage({ params }) {
  const propertyId = (await params).propertyId;
  

  const res = await db.query(
    `SELECT id FROM roles WHERE property_id = $1 AND landlord_id IS NOT NULL`,
    [propertyId]
  );


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
  const propertyAddress = `
    ${tenantData.address_line1}, 
    ${tenantData.address_line2}, 
    ${tenantData.city}, 
    ${tenantData.postcode}
  `;

  const roleId = res.rows[0].id;

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-6 space-y-8">
       
        <section className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border-2 border-gray-400/30 p-6">
          <header className="mb-6 pb-4 border-b-2 border-current">
            <h1 className="text-2xl font-bold">
              PROPERTY VIEW
            </h1>
          </header>
          <PropertyView propertyId={propertyId} />
        </section>

        <section className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border-2 border-gray-400/30 p-6">
          <header className="mb-6 pb-4 border-b-2 border-current">
            <h2 className="text-2xl font-bold">
              REPAIRS
            </h2>
          </header>
          <GetRepairsListProperties propertyId={propertyId} />
        </section>

        <section className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg border-2 border-gray-400/30 p-6">
          <header className="mb-6 pb-4 border-b-2 border-current">
            <h2 className="text-2xl font-bold">
              ADD NEW REPAIR
            </h2>
          </header>
          <div className="space-y-6">
            <RepairForm
              roleId={roleId}
              propertyAddress={propertyAddress}
              tenantName={tenantName}
            />
            
            <div className="mt-6 p-6 bg-white/5 backdrop-blur-sm rounded-lg border-2 border-gray-400/30">
              <h3 className="text-xl font-semibold mb-4">Upload Images</h3>
              <ImagePage />
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}