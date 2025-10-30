import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();
  const clerkId = user.id;

  // const tenantLandlordCheck = await db.query(
  //   `SELECT id FROM users JOIN roles ON  WHERE users.clerk_id = $1`,
  //   [clerkId]
  // );
  //check if any row in roles.tenant_id has user.id
  //if yes, then isTenant = true
  //if no, then isLandlord = true

  const dbIdRes = await db.query(`SELECT id from users WHERE clerk_id = $1`, [
    clerkId,
  ]);
  const dbId = dbIdRes.rows[0].id;
  console.log("dbId: ", dbId);
  //! now check if dbId in any row in roles.tenant_id

  const isTenantRes = await db.query(
    `SELECT tenant_id FROM roles JOIN users ON roles.tenant_id = users.id WHERE roles.tenant_id = $1`,
    [dbId]
  );
  const isTenant = isTenantRes.rows[0];

  console.log("istenant?", isTenant);

  if (isTenant == null) {
    const landlordId = dbId;

    return (
      <div>
        <h1>IS LANDLORD</h1>
        <Link href={`/user/${landlordId}/properties`}>
          <button>View Properties</button>
        </Link>
      </div>
    );
  } else {
    const propertyId = isTenant.tenant_id;
    return (
      <div>
        <h1>IS TENANT</h1>
        <Link href={`/properties/${propertyId}`}>
          <button>View Repairs</button>
        </Link>
      </div>
    );
  }
}
