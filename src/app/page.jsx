import { db } from "@/utils/dbConnection";
import { SignInButton, SignOutButton } from "@clerk/nextjs";

export default async function HomePage() {
  const res = await db.query(`SELECT * FROM properties`);
  const data = res.rows;

  console.log(data);
  return (
    <div>
      <SignInButton />
      <SignOutButton />
      <p className="h-screen bg-gradient-to-br from-green-800 via-green-600 to-green-300">
        Welcome to LeaseLink!
      </p>

      <p>Dan&apos;s House is in:</p>
      {data.map((datum) => {
        return (
          <div key={datum.id}>
            <p>{datum.country}</p>
          </div>
        );
      })}
    </div>
  );
}
