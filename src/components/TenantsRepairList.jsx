import RepairCard from "./RepairCard";
import { db } from "@/utils/dbConnection";

export default async function TenantRepairsList({ roleId }) {
    if (!roleId) return <p>No role assigned, cannot fetch repairs.</p>;

    const res = await db.query(
    `SELECT * FROM repairs WHERE role_id = $1 ORDER BY created_at DESC`,
    [roleId]
    );
    const repairs = res.rows;

    if (repairs.length === 0) return <p>No repairs submitted yet.</p>;

    return (
    <div className="space-y-6">
        {repairs.map((repair) => (
        <RepairCard key={repair.id} repair={repair} />
        ))}
    </div>
    );
}
