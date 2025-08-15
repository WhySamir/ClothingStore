"use client";

import { useState, useCallback, ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RatingLib from "react-rating";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";

// Validation schema
const reviewSchema = z.object({
  rating: z.number().min(0.1, "Please select a rating"),
  title: z.string().min(3, "Title must be at least 3 characters"),
  detail: z.string().min(10, "Review must be at least 10 characters"),
  media: z.array(z.any()).max(4, "You can upload up to 4 files").optional(),
});

type ReviewFormData = {
  rating: number;
  title: string;
  detail: string;
  media?: File[];
};
interface RatingProps {
  fractions?: number; // optional if library doesn't include it
  initialRating: number;
  onChange: (value: number) => void;
  emptySymbol: ReactElement;
  fullSymbol: ReactElement;
}
export default function ReviewForm() {
  const Rating = RatingLib as unknown as React.FC<RatingProps>;
  const [rating, setRating] = useState(0);
  const [mediaError, setMediaError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    watch,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      title: "",
      detail: "",
      media: [],
    },
  });

  const mediaFiles = watch("media") || [];

  const onSubmit: SubmitHandler<ReviewFormData> = (data) => {
    console.log("Review submitted:", {
      ...data,
      media: data.media?.map((file) => file.name),
    });
    reset({
      rating: 0,
      title: "",
      detail: "",
      media: [],
    });

    setRating(0);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Rating */}
      <div>
        <label className="block text-md font-medium">Your Rating *</label>
        <div className="mt-2">
          <Rating
            fractions={10}
            initialRating={rating}
            onChange={(value: number) => {
              setRating(value);
              setValue("rating", value);
            }}
            emptySymbol={<span className="text-2xl text-gray-300">★</span>}
            fullSymbol={<span className="text-2xl text-yellow-500">★</span>}
          />
        </div>
        {errors.rating && (
          <p className="text-red-500 text-sm">{errors.rating.message}</p>
        )}
      </div>

      {/* Review Title */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Add Review Title *
        </label>
        <input
          type="text"
          {...register("title")}
          className="border border-gray-300 focus:outline-none rounded p-2 w-full"
          placeholder="Write title here"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      {/* Review Detail */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Add Detailed Review *
        </label>
        <textarea
          {...register("detail")}
          className="border border-gray-300 rounded p-2 w-full focus:outline-none"
          rows={4}
          placeholder="Write here"
        />
        {errors.detail && (
          <p className="text-red-500 text-sm">{errors.detail.message}</p>
        )}
      </div>

      {/* Media Upload */}
      <MediaUpload
        files={mediaFiles}
        onChange={(files) => {
          setValue("media", files);
          setMediaError(null);
        }}
        error={mediaError}
        setError={setMediaError}
      />
      {mediaError && <p className="text-red-500 text-sm">{mediaError}</p>}

      {/* Submit */}
      <button
        type="submit"
        className="bg-orange-950 text-white px-4 py-2 rounded mt-2"
      >
        Submit
      </button>
    </form>
  );
}

interface MediaUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  error: string | null;
  setError: (msg: string | null) => void;
}

function MediaUpload({ files, onChange, error, setError }: MediaUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      let updatedFiles = [...files];
      let hasVideo = updatedFiles.some((f) => f.type.startsWith("video"));

      for (const file of acceptedFiles) {
        const isVideo = file.type.startsWith("video");

        // Only allow one video
        if (isVideo && hasVideo) {
          setError("You can only upload 1 video");
          continue;
        }

        // Duplicate check
        if (updatedFiles.some((f) => f.name === file.name)) {
          setError(`File "${file.name}" is already selected`);
          continue;
        }

        // File size check (10MB)
        if (file.size > 10 * 1024 * 1024) {
          setError(`File "${file.name}" exceeds 10MB`);
          continue;
        }

        updatedFiles.push(file);
        if (isVideo) hasVideo = true;
      }

      // Max files check
      if (updatedFiles.length > 4) {
        setError("You can upload up to 4 files");
        updatedFiles = updatedFiles.slice(0, 4);
      }

      onChange(updatedFiles);
    },
    [files, onChange, setError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [], "video/*": [] },
    onDrop,
  });

  const removeFile = (name: string) => {
    const updated = files.filter((f) => f.name !== name);
    onChange(updated);
    setError(null);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        Photo / Video (Optional)
      </label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-4 text-center cursor-pointer transition ${
          isDragActive ? "bg-gray-100" : ""
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2">
          <ImagePlus size={48} className="text-gray-400" />
          <p>Drag & drop photos/videos here, or click to browse</p>
          <p className="text-xs text-gray-500">Max 4 files, 10MB each</p>
        </div>
      </div>

      {/* Preview */}
      <div className="mt-3 flex gap-3 flex-wrap">
        {files.map((file) => {
          const isImage = file.type.startsWith("image");
          const isVideo = file.type.startsWith("video");

          return (
            <div key={file.name} className="relative group w-[100px] h-[100px]">
              {isImage && (
                <Image
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  fill
                  className="object-cover rounded border"
                />
              )}
              {isVideo && (
                <video
                  src={URL.createObjectURL(file)}
                  className="w-full h-full object-cover rounded border"
                  muted
                  controls={false}
                />
              )}

              {/* Delete button */}
              <button
                type="button"
                onClick={() => removeFile(file.name)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
