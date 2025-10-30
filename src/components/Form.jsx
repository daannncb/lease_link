import RepairCommentList from "./RepairCommentList";

export default function Form ({ repair, comments, deleteAction }) {
    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-slate-600 text-white p-6 rounded-lg mb-6 shadow-lg">
                <h1 className="text-2xl font-bold mb-2">Repair Ticket</h1>
                <p className="text-lg">{repair.description}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-3 ${
                    repair.status === 'pending' ? 'bg-yellow-400' :
                    repair.status === 'in_progress' ? 'bg-blue-400' :
                    repair.status === 'completed' ? 'bg-green-400' : 'bg-gray-400'
                }`}>
                    {repair.status?.toUpperCase() || 'PENDINgG'}
                </span>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-4">Comments</h2>
                <RepairCommentList 
                comments={comments} 
                deleteAction={deleteAction}
                repairId={repair.id}/>
            
</div>
        </div>
    );
}