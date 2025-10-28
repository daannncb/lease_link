export default function PropertyCard({ property }) {
      return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold text-slate-700 mb-2">
    
        {property.address1}
      </h2>
      
      <p className="text-gray-600">
        {property.city}, 
        {property.postcode}</p>
      <p className="text-gray-500 mt-4">
        {property.description}
        </p>
    </div>
  );
}