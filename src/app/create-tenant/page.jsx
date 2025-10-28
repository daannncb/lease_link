import LandlordPropertiesView from "../user/[userId]/properties/page";
import { db } from "@/utils/dbConnection";

export default async function CreateProfile() {
  const res = await db.query(
    //! security issue! remove * and replace with address fields
    `SELECT * FROM properties JOIN roles ON properties.id = roles.property_id WHERE roles.tenant_id IS NULL`
  );

  async function handleSubmit(formData) {
    "use server";
    const userProperty = formData.get("properties");
    console.log(userProperty);
    await db.query(
      `INSERT INTO roles (tenant_id) VALUES ($1) WHERE property_id = $2`,
      [userRole, userProperty]
    );
  }

  const properties = res.rows;

  console.log(properties);
  return (
    <div>
      <h1>Please select the property you&apos;re renting:</h1>
      <fieldset>
        <form action={handleSubmit}>
          <div>
            <label name="property-id">Select a property:</label>
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
          <button type="submit">Create Profile</button>
        </form>
      </fieldset>
    </div>
  );
}
