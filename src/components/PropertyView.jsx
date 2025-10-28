import { db } from "@/utils/dbConnection";

export default async function PropertyView({ propertyId }) {
  const res = await db.query(
    `SELECT * FROM properties WHERE id = ${propertyId}`
  );
  const propertyData = res.rows[0];
  return (
    <div>
      <h1>
        {propertyData.address_line1}, {propertyData.address_line2},{" "}
        {propertyData.city}, {propertyData.postcode}
      </h1>
    </div>
  );
}
