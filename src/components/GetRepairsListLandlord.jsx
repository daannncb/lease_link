// components/GetRepairsListLandlord.jsx
import { db } from "@/utils/dbConnection";
import RepairCard from "./RepairCard";

export default async function GetRepairsListLandlord({ landlordId }) {
  if (!landlordId) return <p>No landlord specified.</p>;

  // Fetch all properties for this landlord
  const propertyRes = await db.query(
  `SELECT 
      properties.id AS property_id, 
      properties.address_line1 AS address_line_1, 
      properties.address_line2 AS address_line_2, 
      properties.city AS city, 
      properties.postcode AS postcode, 
      properties.country AS country, 
      properties.description AS description
    FROM properties
    JOIN roles ON roles.property_id = properties.id
    WHERE roles.landlord_id = $1`,
  [landlordId]
);


  const properties = propertyRes.rows;

  if (!properties.length) return <p>No properties found for this landlord.</p>;

  return (
    <div className="space-y-6">
      {properties.map((property) => (
        <div key={property.property_id} className="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-2">
            {property.address_line1}, {property.city}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{property.description}</p>

          {/* Fetch repairs for this property */}
          <PropertyRepairs propertyId={property.property_id} />
        </div>
      ))}
    </div>
  );
}

async function PropertyRepairs({ propertyId }) {
  const repairsRes = await db.query(
    `SELECT * FROM repairs WHERE property_id = $1 ORDER BY created_at DESC`,
    [propertyId]
  );

  const repairs = repairsRes.rows;

  if (!repairs.length) return <p>No repairs for this property.</p>;

  return (
    <div className="space-y-4">
      {repairs.map((repair) => (
        <RepairCard key={repair.id} repair={repair} />
      ))}
    </div>
  );
}
