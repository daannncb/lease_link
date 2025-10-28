import RepairForm from "@/components/repairForm";
import { db } from "@/utils/dbConnection";
import GetRepairsListLandlord from "@/components/GetRepairsListLandlord";

export default async function PropertyPage({ params }) {
  const propertyId = (await params).propertyId;
  //get landlord id from roles table to pass as a param
  const res = await db.query(
    `SELECT id FROM roles WHERE property_id = ${propertyId} AND landlord_id IS NOT NULL`
  );
  //get tenant info for emails to pass as param
  // const res2 = await db.query(
  //   `SELECT id FROM roles WHERE property_id = ${propertyId} AND landlord_id IS NOT NULL`
  // );
  //! this query needs to get tenantName, propertyAddress for the repairForm, the same as how roleId has been passed to <RepairForm />. These are in the users and properties table, - select full_name from users JOIN properties on WHERE property_id = $1 AND tenant_id IS NOT NULL

  const roleId = res.rows[0].id;
  console.log(roleId);
  // if (clerk user = tenant id/landlord id)
  return (
    <>
      <div>
        <p>Protected Page</p>
        <RepairForm roleId={roleId} />
      </div>
      <div>
        <GetRepairsListLandlord propertyId={propertyId} />
        {/* This list needs some formatting, and the query looking at. Just added to see whats up with this */}
      </div>
    </>
  );
}
