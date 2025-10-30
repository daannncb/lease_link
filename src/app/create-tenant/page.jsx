import { db } from "@/utils/dbConnection";
import { currentUser } from "@clerk/nextjs/dist/types/server";

export default async function CreateProfile() {
  const user = await currentUser();

  const res = await db.query(
    `SELECT properties.id, properties.address_line1, properties.address_line2, properties.city, properties.postcode, properties.country
    FROM properties
    JOIN roles ON properties.id = roles.property_id
    WHERE roles.tenant_id IS NULL`
  );

  async function handleSubmit(formData) {
    "use server";
    const userProperty = formData.get("properties");
    console.log(userProperty);
    await db.query(`UPDATE roles SET tenant_id = $1 WHERE property_id = $2`, [
      userRole,
      userProperty,
    ]);
  }

  const properties = res.rows;

  console.log(properties);
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-2xl font-bold mb-4">
        Please select the property you&apos;re renting:
      </h1>
      <fieldset>
        <form action={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="property-select" className="block mb-2 font-medium">
              Select a property:
            </label>
            <select name="properties" id="property-select">
              <option value="">------------------</option>
              {properties.map((property) => {
                return (
                  <option key={property.id} value={property.id} readOnly>
                    {property.address_line1}
                  </option>
                );
              })}
            </select>
          </div>
          <button className="px-4 py-2 rounded" type="submit">
            Create Profile
          </button>
        </form>
      </fieldset>
    </div>
  );
}
