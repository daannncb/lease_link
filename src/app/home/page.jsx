import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();
  console.log(user);
  const clerkId = user.id;

  const tenantLandlordCheck = await db.query(
    `SELECT id FROM users JOIN roles ON  WHERE users.clerk_id = $1`,
    [clerkId]
  );
  // check if tenant ID in table
  // select property ID where users.id = roles.tenant_id

  //check if users.id IN roles.tenant_id

  const signedInResLandlord = await db.query(
    `SELECT roles.property_id, roles.landlord_id FROM roles JOIN users on roles.landlord_id = users.id WHERE users.clerk_id = $1`,
    [clerkId]
  );
  const signedInDataLandlord = signedInResLandlord.rows[0];
  const propertyId = signedInDataLandlord.property_id;
  const landlordId = signedInDataLandlord.landlord_id;
  console.log(signedInDataLandlord);

  //code from reverted commit:
  //   const dbUserResult = await db.query(
  //     `SELECT id, clerk_id, full_name, email
  //       FROM users
  //       WHERE clerk_id = $1`,
  //     [user.id]
  //   );

  //   const dbUser = dbUserResult.rows[0];
  //   const isTenant = dbUser.id === tenantId;
  //   const isLandlord = dbUser.id === landlordId;

  return (
    <div>
      <h1>Home Page</h1>
      <Link href={`/properties/${propertyId}`}>
        <button>View Repairs</button>
      </Link>
      <Link href={`/user/${landlordId}/properties`}>
        <button>View Properties</button>
      </Link>
    </div>
  );
}
