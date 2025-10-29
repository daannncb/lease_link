

export default function PropertyCard({ property }) {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold text-slate-700 mb-2">
        {property.address_line1}
      </h2>
      {property.address_line2 && (
        <p className="text-gray-600">{property.address_line2}</p>
      )}
      <p className="text-gray-600">{property.city}, {property.postcode}</p>
      <p className="text-gray-600">{property.country}</p>
      
      {property.description && (
        <p className="text-gray-500 mt-4 text-sm">{property.description}</p>
      )}
    </div>
  );
}