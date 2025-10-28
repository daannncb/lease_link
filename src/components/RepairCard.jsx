export default function RepairCard({ repair, bucket = 'bargainbucket' }) {
  const statusColors = {
    pending: 'bg-yellow-400',
    in_progress: 'bg-blue-400',
    completed: 'bg-green-400',
  };

  const imageUrl = repair.img_url 
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${repair.img_url}`
    : null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all border-4 border-slate-600">
      

      <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
        Repair Request
      </h2>

      <span className={`inline-block px-3 py-1 rounded-full font-bold mb-3 ${statusColors[repair.status] || 'bg-gray-400'}`}>
        {repair.status?.toUpperCase() || 'UNKNOWN'}
      </span>


      <p className="text-gray-700 bg-yellow-50 p-3 rounded-lg mb-3">
        {repair.description}
      </p>

      {imageUrl && (
        <img 
          src={imageUrl} 
          alt="Repair" 
          className="w-full h-48 object-cover rounded-lg mb-3"
        />
      )}


      <p className="text-sm text-gray-500">
        {new Date(repair.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}