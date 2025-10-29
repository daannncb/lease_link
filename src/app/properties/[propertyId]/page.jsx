import RepairForm from "@/components/repairForm";
import { db } from "@/utils/dbConnection";
import GetRepairsListLandlord from "@/components/GetRepairsListLandlord";
import PropertyView from "@/components/PropertyView";
import GetRepairsListProperties from "@/components/GetRepairListProperties";
import ImagePage from "@/components/ImageUploader";


export const metadata = {
  title: "Property Details – LeaseLink",
  description: "View property details, repairs, and submit new repair requests.",
  icons: { icon: "/logo.png" },
};


export default async function PropertyPage({ params }) {
  const propertyId = (await params).propertyId;
  //get landlord id from roles table to pass as a param
  const res = await db.query(
    `SELECT id FROM roles WHERE property_id = ${propertyId} AND landlord_id IS NOT NULL`
  );
  //get tenant info for emails to pass as param
  const res2 = await db.query(
    `SELECT users.full_name, properties.address_line1, properties.address_line2, properties.city, properties.postcode FROM users JOIN roles ON users.id = roles.tenant_id JOIN properties ON roles.property_id = properties.id WHERE roles.property_id = ${propertyId} AND tenant_id IS NOT NULL`
  );
  const tenantData = res2.rows[0];
  const tenantName = tenantData.full_name;
  console.log(tenantData);
  const propertyAddress = `
    ${tenantData.address_line1}, <br>
      ${tenantData.address_line2}, <br>
      ${tenantData.city}, <br>
      ${tenantData.postcode}
  `;

  console.log("Property address", propertyAddress);
  const roleId = res.rows[0].id;

  // if (clerk user = tenant id/landlord id)
  return (
    <>
      <div>
        <h1>PROPERTY VIEW:</h1>
        <PropertyView propertyId={propertyId} />
        <GetRepairsListProperties propertyId={propertyId} />
        <h1>ADD NEW REPAIR:</h1>
        <RepairForm
          roleId={roleId}
          propertyAddress={propertyAddress}
          tenantName={tenantName}
        />
        <ImagePage />
      </div>
      <div>
        {/* <GetRepairsListLandlord propertyId={propertyId} /> */}
        {/* This list needs some formatting, and the query looking at. Just added to see whats up with this */}
      </div>
    </>
  );
}
