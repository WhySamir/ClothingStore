"use client";

import Image from "next/image";
import ReviewForm from "./ReviewForm";
import { VideoPreview } from "./VideoPreview";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Reviews } from "@/types/productDetailsType";
import { useAuth } from "../auth-context";

const RatingBar = ({
  stars,
  percentage,
}: {
  stars: number;
  percentage: number;
}) => {
  return (
    <div className="flex items-center gap-2 text-sm w-full">
      <span className="w-12 text-gray-600">{stars} Star</span>
      <div className="flex-1 bg-gray-200 rounded-full h-2 w-full">
        <div
          className="bg-amber-400 h-2 rounded-full w-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const Review = () => {
  const { user } = useAuth();
  const isLoggedIn = !!user; //explict false if null

  const [showReviewForm, setShowReviewForm] = useState(!isLoggedIn);

  useEffect(() => {
    setShowReviewForm(!isLoggedIn);
  }, [isLoggedIn]);

  const [reviews, setReviews] = useState<Reviews[]>([]);
  const { productId } = useParams<{ productId: string }>();

  useEffect(() => {
    const fetchReview = async () => {
      const res = await fetch(`/api/review/${productId}`);
      const review = await res.json();
      console.log(review.data);
      setReviews(
        Array.isArray(review.data?.reviews) ? review.data.reviews : []
      );
    };
    fetchReview();
  }, [productId]);

  const totalReviews = reviews.length;
  const avgRating = totalReviews
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : 0;

  const distribution = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((r) => Math.floor(r.rating) === stars).length;
    const percentage = totalReviews ? (count / totalReviews) * 100 : 0;

    return { stars, count, percentage };
  });

  return (
    <>
      <div className="desc  md:my-8 w-full">
        {/* //rating */}
        <div className="w-full my-8 overflow-hidden justify-center">
          <div className=" px-6  py-2 md:py-4">
            <div className=" space-y-5 md:grid  md:grid-cols-7 gap-4">
              <div className="col-span-2 flex flex-col items-center justify-center gap-4   md:border-r-1 border-gray-300 h-full w-full font-semibold text-gray-900">
                <h3>
                  <span className="text-4xl font-semibold">{avgRating}</span>{" "}
                  out of 5
                </h3>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => {
                      const rating = avgRating;
                      const starIndex = i + 1;

                      return (
                        <span key={i}>
                          {starIndex <= Math.floor(rating) ? (
                            <Star className="w-3 h-3 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                          ) : (
                            <Star className="w-3 h-3 md:w-5 md:h-5 text-gray-300" />
                          )}
                        </span>
                      );
                    })}
                  </div>
                </div>
                <span> {reviews.length} reviews</span>
              </div>
              <div className="w-full col-span-3 md:col-span-5 space-y-3  mb-4 md:mb-12">
                {distribution.map(({ stars, percentage }) => (
                  <RatingBar
                    key={stars}
                    stars={stars}
                    percentage={percentage}
                  />
                ))}
              </div>
            </div>
          </div>{" "}
          <div className="line w-full h-0.5  bg-gray-200 mt-2"></div>
        </div>

        {/* reviews */}
        <div className=" space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Review List
            </h2>
            {/* <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
              <span className="text-gray-600 text-sm">
                Showing 1-4 of 24 results
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by :</span>
                <select className="max-32">
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="highest">Highest Rated</option>
                  <option value="lowest">Lowest Rated</option>
                </select>
              </div>
            </div> */}
            <div className="space-y-6">
              {reviews.map((review: Reviews) => (
                <div
                  key={review.id}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={
                          review?.customer.userAvatarUrl || "/placeholder.svg"
                        }
                        alt={review?.customer.name || "User Avatar"}
                        width={48}
                        height={48}
                        className="object-cover rounded-full"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {review.customer.name || "Anonymous"}
                            {review?.verified && (
                              <span className="text-gray-500 font-normal">
                                {" "}
                                (Verified)
                              </span>
                            )}
                          </h3>
                        </div>
                        <span className="text-gray-500 text-sm flex-shrink-0">
                          {new Date(review?.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => {
                            const rating = review.rating;
                            const starIndex = i + 1;

                            return (
                              <span key={i}>
                                {starIndex <= Math.floor(rating) ? (
                                  <Star className="w-3 h-3 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                                ) : (
                                  <Star className="w-3 h-3 md:w-5 md:h-5 text-gray-300" />
                                )}
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <h4 className="font-medium text-gray-900 mb-2">
                        {review?.title}
                      </h4>
                      <p className="text-gray-600 mb-3 leading-relaxed">
                        {review?.comment}
                      </p>
                      {/* <StarRating rating={review.rating} showNumber /> */}
                      {review.images.length > 0 && (
                        <div className="w-24 h-auto aspect-square">
                          <div className="flex gap-2">
                            {review.images.map((image, index) => (
                              <Image
                                key={index}
                                src={image}
                                alt={`Review image ${index + 1}`}
                                height={96}
                                width={96}
                                className="object-cover "
                              />
                            ))}
                          </div>
                        </div>
                      )}
                      {review.videos && (
                        <div className="w-24 h-auto aspect-square">
                          <div className="flex gap-2">
                            <div className="flex gap-2">
                              <VideoPreview src={review.videos} />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* review form */}
        {!showReviewForm && (
          <>
            <h1 className="text-2xl font-semibold mt-8 mb-2">
              Add your review
            </h1>
            <p className="mb-2">Your feedback is valuable to us.</p>
            <ReviewForm />
          </>
        )}
      </div>
    </>
  );
};

// const reviews = [
//   {
//     id: 1,
//     author: "John Doe",
//     verified: true,
//     timeAgo: "2 days ago",
//     title: "Great product!",
//     content:
//       "I’ve been using this for a week now and it’s exceeded my expectations. Quality is top-notch.",
//     rating: 5,
//     avatar: "/naive.jpg",
//     images: ["/review.webp", "/review2.webp"],
//     video: null,
//   },
//   {
//     id: 2,
//     author: "Jane Smith",
//     verified: false,
//     timeAgo: "1 week ago",
//     title: "Good but has some issues",
//     content: "Overall, I like the product, and packaging was great.",
//     rating: 4,
//     avatar: "/free.png",
//     images: [],
//     video: "/review.mp4",
//   },
//   {
//     id: 3,
//     author: "Michael Chen",
//     verified: true,
//     timeAgo: "3 weeks ago",
//     title: "Not what I expected",
//     content:
//       "It’s okay, but the color is different from what was shown online.",
//     rating: 3,
//     avatar: "/men.png",
//     images: [],
//     video: null,
//   },
//   {
//     id: 4,
//     author: "Lee Luth",
//     verified: true,
//     timeAgo: "1 month ago",
//     title: "Love it!",
//     content:
//       "Perfect for my needs. Works as described and arrived on time. Will recommend to friends.",
//     rating: 5,
//     avatar: "/freemen.png",
//     images: [],
//     video: null,
//   },
// ];

export default Review;
