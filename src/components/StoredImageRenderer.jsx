"use client";
import { createSupabaseClient } from "./supabase";
import Image from "next/image";

export default function StoredImageRenderer() {
  const supabase = createSupabaseClient();
  const { data } = supabase.storage
    .from("HugeBarginBucket")
    .getPublicUrl("uploads/56fd1a47-ec9f-4176-b47c-55c4c700634f.svg");

  console.log("ImageRenderer:", data.publicUrl);

  return (
    <div>
      <Image src={data.publicUrl} alt="an image" width={500} height={500} />
      <h1>IMAGE RENDERER</h1>
    </div>
  );
}
