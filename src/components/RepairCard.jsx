"use client";

import { Badge, Flex } from "@radix-ui/themes";
import Image from "next/image";

export default function RepairCard({ repair, bucket = "bargainbucket" }) {
  const statusColors = {
    pending: "orange",
    in_progress: "blue",
    completed: "green",
  };

  const imageUrl = repair.img_url
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${repair.img_url}`
    : null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all border-2 border-slate-600">
    
      <h2
        className="text-2xl font-bold mb-3"
        style={{ fontFamily: "Comic Sans MS, cursive" }}
      >
        Repair Request
      </h2>

      {/* Radix UI Badge for status */}
      <Flex gap="2" className="mb-3">
        <Badge color={statusColors[repair.status] || "gray"}>
          {repair.status?.replace("_", " ").toUpperCase() || "UNKNOWN"}
        </Badge>
      </Flex>

      {/* Description */}
      <p className="text-gray-700 dark:text-gray-200 bg-yellow-50 dark:bg-gray-800 p-3 rounded-lg mb-3">
        {repair.description}
      </p>

    
      {imageUrl && (
        <div className="relative w-full h-48 mb-3">
          <Image
            src={imageUrl}
            alt="Repair"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      {/* Date */}
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {new Date(repair.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}
