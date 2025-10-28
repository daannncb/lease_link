//! property view page for properties dynamic route
import { db } from "@/utils/dbConnection";
import Link from "next/link";

export default async function GetRepairsListProperties({ propertyId }) {
  const res = await db.query(
    `SELECT * FROM repairs WHERE status != 'RESOLVED'`
  );
  const repairs = res.rows;
  // console.log(properties);

  return (
    <div>
      <h1>Repairs:</h1>
      {repairs.map((repair) => {
        return (
          <div key={repair.id}>
            <Link href={`/properties/${propertyId}/repairs/${repair.id}`}>
              <h1>
                {repair.title} <span>{repair.status}</span>
              </h1>
            </Link>
            <p>{repair.description}</p>
            <br></br>
          </div>
        );
      })}
    </div>
  );
}
