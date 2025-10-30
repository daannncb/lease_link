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
  <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-(--color-beige) dark:bg-(--color-sage-green) transition-colors duration-500 relative overflow-hidden">
  
    <div className="absolute inset-0 bg-linear-to-br from-(--color-sage-green)/20 to-(--color-beige)/20 dark:from-(--color-beige)/15 dark:to-(--color-sage-green)/15 backdrop-blur-3xl pointer-events-none" />

    <div className="relative z-10 text-center p-12 rounded-3xl shadow-2xl bg-white/30 dark:bg-(--color-sage-green)/30 backdrop-blur-xl border border-white/30 max-w-lg w-full transition-all duration-500 hover:shadow-3xl">
      <h1 className="text-5xl font-extrabold mb-6 text-(--color-sage-green) dark:text-(--color-beige) drop-shadow-lg">
        IS LANDLORD
      </h1>
      <Link href={`/user/${landlordId}/properties`}>
        <button className="px-8 py-4 rounded-xl bg-(--color-sage-green) text-(--color-beige) font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
          View Properties
        </button>
      </Link>
    </div>
  </div>
);
} else {
  const propertyId = isTenant.tenant_id;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-(--color-beige) dark:bg-(--color-sage-green) transition-colors duration-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-(--color-sage-green)/20 to-(--color-beige)/20 dark:from-(--color-beige)/15 dark:to-(--color-sage-green)/15 backdrop-blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center p-12 rounded-3xl shadow-2xl bg-white/30 dark:bg-(--color-sage-green)/30 backdrop-blur-xl border border-white/30 max-w-lg w-full transition-all duration-500 hover:shadow-3xl">
        <h1 className="text-5xl font-extrabold mb-6 text-(--color-sage-green) dark:text-(--color-beige) drop-shadow-lg">
          IS TENANT
        </h1>
        <Link href={`/properties/${propertyId}`}>
          <button className="px-8 py-4 rounded-xl bg-(--color-sage-green) text-(--color-beige) font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
            View Repairs
          </button>
        </Link>
      </div>
    </div>
  );
}
}
