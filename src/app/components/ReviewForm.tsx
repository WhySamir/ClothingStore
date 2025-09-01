"use client";

import { useState, useCallback, ReactElement } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import RatingLib from "react-rating";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { MediaUpload } from "./MediaUpload";

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
