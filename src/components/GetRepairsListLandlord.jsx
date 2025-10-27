//! property view page for landlords - multiple properties rendered if landlord has multiple
//! not finished

export default async function PropertyPage({ params }) {
  const propertyId = (await params).propertyId;

  const res = await db.query(`SELECT
 properties.id,
 properties.address_line1,
 properties.city,
 properties.postcode,
 properties.country,
 properties.description
FROM properties
LEFT JOIN roles
 ON roles.property_id = properties.id
WHERE roles.landlord_id = 2;`);
  const properties = res.rows;

  return (
    <div>
      <h1>Properties:</h1>
      {/* need to map as landlords can have multiple */}
      {properties.map((property) => {
        return (
          <div key={property.id}>
            <h1>{property.address_line1}</h1>
            <h1>{property.address_line2}</h1>
            <h1>{property.city}</h1>
            <h1>{property.postcode}</h1>
            <p>{property.description}</p>
          </div>
        );
      })}
    </div>
  );
}
