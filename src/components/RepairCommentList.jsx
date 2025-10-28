import DeleteButton from './DeleteButton.jsx';

export default function RepairCommentList({ comments, repairId, deleteAction }) {
    if (comments.length === 0) {
        return <p>No comments yet.</p>;
    }

    return (
    <div className="space-y-3">
      {comments.map((comment) => (
        <div 
          key={comment.id} 
          className="bg-white border border-gray-300 rounded p-4 flex justify-between items-center"
        >
          <div>
            <p className="text-gray-800">{comment.comment}</p>
            <small className="text-gray-500">
              {new Date(comment.created_at).toLocaleDateString()}
            </small>
          </div>
          
          <DeleteButton 
            commentId={comment.id}
            repairId={repairId}
            deleteAction={deleteAction}
          />
        </div>
      ))}
    </div>
  );
}


        
    