"use client";
import { useFormStatus } from "react-dom";

function DeleteButtonContent() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded disabled:opacity-50"
      disabled={pending}
    >
      {pending ? "Deleting..." : "Delete comment"}
    </button>
  );
}

export default function DeleteButton({ commentId, repairId, deleteAction }) {
  return (
    <form action={deleteAction.bind(null, commentId, repairId)}>
      <DeleteButtonContent />
    </form>
  );
}