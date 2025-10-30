import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const clerkId = user.id;

  const dbIdRes = await db.query(`SELECT id from users WHERE clerk_id = $1`, [
    clerkId,
  ]);
  const dbId = dbIdRes.rows[0].id;

  const isTenantRes = await db.query(
    `SELECT tenant_id FROM roles JOIN users ON roles.tenant_id = users.id WHERE roles.tenant_id = $1`,
    [dbId]
  );
  const isTenant = isTenantRes.rows[0];

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
