
import { db } from "@/utils/dbConnection";
import PropertiesCarousel from '@/components/PropertiesCarousel';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default async function LandlordPropertiesView({ params }) {
  const { userId: clerkId } = auth(); 
  const { userId } = params;
  if (!clerkId || clerkId !== userId) {
    redirect('/unauthorized'); 
  }

  const res = await db.query(`
    SELECT 
      properties.id,
      properties.address_line1,
      properties.address_line2,
      properties.city,
      properties.postcode,
      properties.country,
      properties.description
    FROM properties
    LEFT JOIN roles ON roles.property_id = properties.id
    WHERE roles.landlord_id = (
      SELECT id FROM users WHERE clerk_id = $1
    )
  `, [clerkId]);

  const properties = res.rows;

  if (properties.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No properties found
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-700 mb-6">My Properties</h1>
      <PropertiesCarousel properties={properties} />
    </div>
  );
}
