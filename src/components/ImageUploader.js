"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { uploadImage } from "./storage";
import { convertBlobUrlToFile } from "@/utils/blob";

export default function ImagePage() {
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isPending, startTransition] = useTransition();
  const imageInputRef = useRef(null);

  const handleImageChange = (e) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages(files);
    setImageUrls(previewUrls);
  };

  const handleClickUploadImagesButton = () => {
    startTransition(async () => {
      const uploadedUrls = [];

      for (const file of selectedImages) {
        try {
          const { imageUrl, error } = await uploadImage({
            file,
            bucket: "HugeBargainBucket",
            folder: "uploads",
          });

          if (error) {
            console.error("Upload failed:", error);
            continue;
          }

          uploadedUrls.push(imageUrl);

          const { data, dbError } = await supabase.from("repairs").insert({
            img_url: imageUrl,
            status: "PENDING",
            description: null,
          });

          if (dbError) {
            console.error("DB insert failed:", dbError);
          }
        } catch (err) {
          console.error("Unexpected upload error:", err);
        }
      }

      setImageUrls((prev) => [...uploadedUrls, ...prev]);
      setSelectedImages([]);
      console.log("✅ Uploaded URLs:", uploadedUrls);
    });
  };

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-start p-8 text-white">
      <h1 className="text-3xl font-bold mb-4">Supabase Image Upload Demo</h1>

      <input
        type="file"
        hidden
        multiple
        ref={imageInputRef}
        onChange={handleImageChange}
        disabled={isPending}
      />

      <button
        onClick={() => imageInputRef.current?.click()}
        className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition mb-4"
        disabled={isPending}
      >
        Select Images
      </button>

      <div className="flex flex-wrap gap-4 justify-center">
        {imageUrls.map((url) => (
          <div key={url} className="relative">
            <Image
              src={url}
              alt="Selected"
              width={128}
              height={128}
              className="w-32 h-32 object-cover rounded shadow"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleClickUploadImagesButton}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition mt-4"
        disabled={isPending || selectedImages.length === 0}
      >
        {isPending ? "Uploading..." : "Upload to Supabase"}
      </button>
    </div>
  );
}
