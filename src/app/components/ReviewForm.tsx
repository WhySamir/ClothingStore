"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import StarRatings from "react-star-ratings";
import { MediaUpload } from "./MediaUpload";
import { useParams } from "next/navigation";

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

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [mediaError, setMediaError] = useState<string | null>(null);
  const { productId } = useParams<{ productId: string }>();

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

  const onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
    try {
      const formData = new FormData();

      formData.append("rating", String(data.rating));
      formData.append("title", data.title);
      formData.append("comment", data.detail);

      if (data.media) {
        data.media.forEach((file) => {
          if (file.type.startsWith("image")) {
            formData.append("images", file);
          } else if (file.type.startsWith("video")) {
            formData.append("video", file);
          }
        });
      }
      const response = await fetch(`/api/review/${productId}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      const result = await response.json();
      console.log("Review submitted:", result);

      reset({
        rating: 0,
        title: "",
        detail: "",
        media: [],
      });

      setRating(0);
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  const changeRating = (newRating: number) => {
    setRating(newRating);
    setValue("rating", newRating);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      {/* Rating */}
      <div>
        <label className="block text-md font-medium mb-2">Your Rating *</label>
        <div className="mt-2">
          <StarRatings
            rating={rating}
            starRatedColor="#f59e0b"
            starHoverColor="#f59e0b"
            starDimension="28px"
            starSpacing="2px"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
          />
        </div>
        {errors.rating && (
          <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
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
          className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded p-2 w-full"
          placeholder="Write title here"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Review Detail */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Add Detailed Review *
        </label>
        <textarea
          {...register("detail")}
          className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
          rows={4}
          placeholder="Write here"
        />
        {errors.detail && (
          <p className="text-red-500 text-sm mt-1">{errors.detail.message}</p>
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
      {mediaError && <p className="text-red-500 text-sm mt-1">{mediaError}</p>}

      {/* Submit */}
      <button
        type="submit"
        className="bg-orange-950 hover:bg-orange-700 text-white px-6 py-3 rounded mt-4 font-medium transition-colors"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
