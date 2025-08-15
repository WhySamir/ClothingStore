"use client";

import { VideoPreview } from "@/app/components/VideoPreview";
import { Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Stats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

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

export default function Page({ stats }: { stats?: Stats }) {
  const [select, setSelect] = useState<number>(0);
  const [lineStyle, setLineStyle] = useState({ width: 0, left: 0 });
  const tabRefs = useRef<HTMLHeadingElement[]>([]);

  const tabs = ["Description", "Additional Information", "Review"];

  useEffect(() => {
    const updateLineStyle = () => {
      if (tabRefs.current[select]) {
        const tab = tabRefs.current[select];
        setLineStyle({
          width: tab.offsetWidth,
          left: tab.offsetLeft,
        });
      }
    };
    updateLineStyle();
    window.addEventListener("resize", updateLineStyle);
    return () => {
      window.removeEventListener("resize", updateLineStyle);
    };
  }, [select]);

  return (
    <>
      <div className="flex flex-col mt-8 md:mt-20  items-center">
        <div className="relative flex justify-center gap-8 md:gap-16 items-center">
          {tabs.map((tab, index) => (
            <h1
              key={index}
              ref={(el) => {
                if (el) tabRefs.current[index] = el;
              }}
              onClick={() => setSelect(index)}
              className="text-gray-600  md:text-2xl cursor-pointer relative"
            >
              {tab}
            </h1>
          ))}

          {/* Sliding underline */}
          <div
            className="absolute -bottom-2.5 h-1 bg-black rounded-full transition-all duration-300 ease-in-out"
            style={{
              width: lineStyle.width,
              left: lineStyle.left,
            }}
          ></div>
        </div>

        {/* Gray line below */}
        <div className="line w-full h-0.5 bg-gray-200 mt-2"></div>
        {/* description &review */}
        {select === 0 && (
          <div className="desc my-8">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis
            explicabo doloremque atque vitae minus accusamus provident quidem
            aperiam aliquid molestiae asperiores magni sint, neque vero fugit,
            eius, perspiciatis officia nam?
          </div>
        )}
        {select === 1 && (
          <div className="w-full my-8 overflow-hidden  border border-border">
            <div className="bg-amber-300/80 px-6 py-4">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <h3 className="col-span-1 font-semibold text-gray-900">
                  Feature
                </h3>
                <h3 className="font-semibold text-gray-900">Description</h3>
              </div>
            </div>
            <div className="divide-y divide-border">
              {specs.map((spec, index) => (
                <div
                  key={index}
                  className={`px-6 py-4 grid grid-cols-2 md:grid-cols-6 gap-4 ${
                    index % 2 === 0 ? "bg-background" : "bg-muted/30"
                  }`}
                >
                  <div className="col-span-1 font-medium text-muted-foreground">
                    {spec.feature}
                  </div>
                  <div className="md:col-span-5 text-foreground">
                    {spec.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {select === 2 && (
          <div className="desc  md:my-8 w-full">
            {/* //rating */}
            <div className="w-full my-8 overflow-hidden justify-center">
              <div className=" px-6  py-2 md:py-4">
                <div className=" space-y-5 md:grid  md:grid-cols-7 gap-4">
                  <div className="col-span-2 flex flex-col items-center justify-center gap-4   md:border-r-1 border-gray-300 h-full w-full font-semibold text-gray-900">
                    <h3>
                      <span className="text-4xl font-semibold">4.7</span> out of
                      5
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3 h-3  md:w-5 md:h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <span> (101 )reviews</span>
                  </div>
                  <div className="w-full col-span-3 md:col-span-5 space-y-3  mb-4 md:mb-12">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <RatingBar key={stars} stars={stars} percentage={60} />
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

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
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
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-6 last:border-b-0"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 flex-shrink-0 overflow-hidden rounded-full">
                          <Image
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.author}
                            width={48}
                            height={48}
                            className="object-cover rounded-full"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {review.author}
                                {review.verified && (
                                  <span className="text-gray-500 font-normal">
                                    {" "}
                                    (Verified)
                                  </span>
                                )}
                              </h3>
                            </div>
                            <span className="text-gray-500 text-sm flex-shrink-0">
                              {review.timeAgo}
                            </span>
                          </div>

                          <h4 className="font-medium text-gray-900 mb-2">
                            {review.title}
                          </h4>
                          <p className="text-gray-600 mb-3 leading-relaxed">
                            {review.content}
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
                          {review.video && (
                            <div className="w-24 h-auto aspect-square">
                              <div className="flex gap-2">
                                <div className="flex gap-2">
                                  <VideoPreview src={review.video} />
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
          </div>
        )}
      </div>
    </>
  );
}
const specs = [
  { feature: "Material", description: "Cotton" },
  { feature: "Size", description: "S,M,L,XL,XXL,XXXL" },
  { feature: "Color", description: "Brown, Grey, Green, Red, Blue" },
  { feature: "Country of Origin", description: "United States" },
  { feature: "Brand", description: "KD Design" },
];

const reviews = [
  {
    id: 1,
    author: "John Doe",
    verified: true,
    timeAgo: "2 days ago",
    title: "Great product!",
    content:
      "I’ve been using this for a week now and it’s exceeded my expectations. Quality is top-notch.",
    rating: 5,
    avatar: "/naive.jpg",
    images: ["/review.webp", "/review2.webp"],
    video: null,
  },
  {
    id: 2,
    author: "Jane Smith",
    verified: false,
    timeAgo: "1 week ago",
    title: "Good but has some issues",
    content:
      "Overall, I like the product, but I wish the battery lasted longer. Packaging was great though.",
    rating: 4,
    avatar: "/free.png",
    images: [],
    video: "/review.mp4",
  },
  {
    id: 3,
    author: "Michael Chen",
    verified: true,
    timeAgo: "3 weeks ago",
    title: "Not what I expected",
    content:
      "It’s okay, but the color is different from what was shown online. Performance is average.",
    rating: 3,
    avatar: "/men.png",
    images: [],
    video: null,
  },
  {
    id: 4,
    author: "Lee Luth",
    verified: true,
    timeAgo: "1 month ago",
    title: "Love it!",
    content:
      "Perfect for my needs. Works as described and arrived on time. Will recommend to friends.",
    rating: 5,
    avatar: "/freemen.png",
    images: [],
    video: null,
  },
];
