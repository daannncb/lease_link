"use client";
import { createSupabaseClient } from "./supabase";
import Image from "next/image";

export default function StoredImageRenderer() {
  const supabase = createSupabaseClient();
  const { data } = supabase.storage
    .from("HugeBarginBucket")
    //////////////////////
    //! this needs to be a dynamic route, OR we store the supabase URL for this image in the repairs table at point of upload in the imageUploader.js component
    .getPublicUrl("uploads/56fd1a47-ec9f-4176-b47c-55c4c700634f.svg");
  //////////////////////

  console.log("ImageRenderer:", data.publicUrl);

  return (
    <div>
      <Image src={data.publicUrl} alt="an image" width={500} height={500} />
      <h1>IMAGE RENDERER</h1>
    </div>
  );
}

// const { data } = supabase
// .storage
// .from('public-bucket')
// .getPublicUrl('folder/avatar1.png', {
//   transform: {
//     width: 100,
//     height: 100,
//   }
// })
