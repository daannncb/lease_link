import RepairForm from "@/components/repairForm";
import { db } from "@/utils/dbConnection";

export default async function PropertyPage({ params }) {
  const propertyId = (await params).propertyId;
  const res = await db.query(
    `SELECT id FROM roles WHERE property_id = ${propertyId} AND landlord_id IS NOT NULL`
  );

  // const res2 = await db.query(
  //   `SELECT id FROM roles WHERE property_id = ${propertyId} AND landlord_id IS NOT NULL`
  // );
  //! this query needs to get tenantName, propertyAddress for the repairForm, the same as how roleId has been passed to <RepairForm />

  const roleId = res.rows[0].id;
  console.log(roleId);

  return (
    <div>
      <p>Protected Page</p>
      <RepairForm roleId={roleId} />
    </div>
  );
}
