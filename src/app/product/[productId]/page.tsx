// "use client";
// import React, { useState, useEffect } from "react";
// import { Heart } from "lucide-react";
// import { useRouter, useSearchParams } from "next/navigation";
// // import Spinner from "./Spinner";

// // Helper components
// const ImageGallery = ({ thumbnails, mainImage, setMainImage }: any) => {
//   const handleError = (event: any, index: any) => {
//     event.target.src = `W${index + 1}.png`;
//   };
//   const [currentIndex, setCurrentIndex] = useState<any | null>(null);
//   const handleNextImage = () => {
//     const nextIndex = (currentIndex + 1) % thumbnails.length;
//     setCurrentIndex(nextIndex);
//     setMainImage(thumbnails[nextIndex]);
//   };

//   const handlePrevImage = () => {
//     const prevIndex =
//       (currentIndex - 1 + thumbnails.length) % thumbnails.length;
//     setCurrentIndex(prevIndex);
//     setMainImage(thumbnails[prevIndex]);
//   };
//   const handleThumbnailClick = (index: any) => {
//     setCurrentIndex(index);
//     setMainImage(thumbnails[index]);
//   };
//   return (
//     <div className=" flex gap-4 justify-start m-5 ">
//       <div className="flex flex-col  space-y-5 ">
//         <div className=" relative   ">
//           {" "}
//           <button
//             onClick={handlePrevImage}
//             className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
//           >
//             &#10094;
//           </button>
//           <img
//             src={`/coat.png`}
//             onError={(event) => handleError(event, currentIndex)}
//             className="max-w-132 h-auto bg-[#F6F6F6] aspect-[4/5] rounded-xl object-cover"
//           />
//           <button
//             onClick={handleNextImage}
//             className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
//           >
//             &#10095;
//           </button>
//         </div>
//         <div className="flex">
//           {thumbnails.map((src: string, index: any) => (
//             <img
//               key={index}
//               src={`/coat.png`}
//               alt={`W${index + 1}.png`}
//               className="mb-4 bg-white/50 h-auto w-30  cursor-pointer "
//               onMouseOver={() => handleThumbnailClick(index)}
//               onError={(event) => handleError(event, index)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductInfo = ({
//   id,
//   title,
//   description,
//   price,
//   sizes,
//   colors,
//   selectedSize,
//   setSelectedSize,
//   selectedColor,
//   setSelectedColor,
//   mainImage,
//   setMainImage,
// }: any) => {
//   const addedtoclick = () => {
//     const selectedShoe = {
//       id,
//       title,
//       price,
//       size: selectedSize,
//       description,
//       image: mainImage,
//     };
//     console.log(id);
//     console.log(selectedShoe);
//     // Dispatch the selected shoe to the Redux store
//   };
//   return (
//     <div className=" main  p-4 mx-4 md:mx-0 rounded-lg  flex-grow overflow-auto h-full scrollbar-hide ">
//       <div className="mb-4">
//         <h1 className="text-2xl font-bold">{title}</h1>
//         <p className="text-gray-600">{description}</p>
//         <p className="text-xl font-semibold my-2">Rp {price}</p>
//       </div>
//       <div className="mb-4">
//         <div className="flex space-x-2">
//           {colors.map((color: String, index: any) => (
//             <img
//               key={index}
//               src={`/${color}`}
//               onClick={() => {
//                 setSelectedColor(index); // Set the selected color
//                 setMainImage(color); // Update the main image based on selected color
//               }}
//               className={`w-14 h-14 cursor-pointer  bg-white/50 ${
//                 selectedColor === index ? "border-2 border-black" : ""
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//       <div className="mb-4">
//         <h2 className="text-lg font-semibold mb-2">Select Size</h2>
//         <div className="grid grid-cols-3 gap-2">
//           {sizes.map((size: any) => (
//             <button
//               key={size}
//               className={`py-2 px-1 md:px-4 border text-xs md:text-base ${
//                 selectedSize === size ? "bg-gray-200" : "bg-white"
//               } ${
//                 size === 45.5 || size === 46 || size === 47
//                   ? "text-gray-400 cursor-not-allowed"
//                   : "cursor-pointer"
//               }`}
//               onClick={() => setSelectedSize(size)}
//               disabled={size === 45.5 || size === 46 || size === 47}
//             >
//               {size}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div>
//         <button
//           onClick={() => {
//             addedtoclick(); // First, add the item to the cart
//           }}
//           className="w-full bg-black text-white py-3 rounded-3xl mb-2"
//         >
//           Add to Bag
//         </button>

//         <button className="w-full border border-gray-300 py-3 rounded-3xl flex items-center justify-center">
//           <Heart className="mr-2" /> Favourite
//         </button>
//       </div>
//       <div className="text-center my-4">
//         This product is excluded from site promotions and discounts.
//       </div>
//       <div className="dex border-b-2">View Product Details</div>

//       <div className="flex justify-between items-center my-4">
//         <h2 className="text-lg font-semibold">Shipping & Returns</h2>
//         <button className="text-gray-500 hover:text-gray-800">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5"
//             viewBox="0 0 20 20"
//             fill="currentColor"
//           >
//             <path
//               fillRule="evenodd"
//               d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </button>
//       </div>
//       <p className="text-gray-700 mb-2">
//         Free standard shipping on orders $50+ and free 60-day returns for Nike
//         Members.{" "}
//         <a href="#" className="text-blue-500 hover:underline">
//           Learn more
//         </a>
//         .{" "}
//         <a href="#" className="text-blue-500 hover:underline">
//           Return policy exclusions apply.
//         </a>
//       </p>
//       <p className="text-gray-700 mb-4">
//         Pick-up available at select Nike Stores.
//       </p>
//       <div className="border-t pt-4">
//         <h3 className="text-lg font-semibold mb-2">Reviews (88)</h3>
//         <div className="flex items-center">
//           <span className="text-yellow-500">
//             {/* Star icons */}
//             {"★".repeat(4)}
//             {"☆"}
//           </span>
//           <span className="ml-2 text-gray-600">(4.5)</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const page = ({ setLoading }: any) => {
//   const thumbnails = ["/coat.png", "/free.png"];
//   const mainImage = "/free.png";
//   const setMainImage = "/free.png";
//   const sizes = [
//     32, 33.5, 34.5, 35, 36, 37.5, 38, 39, 40, 41, 42, 42.5, 43, 44, 44.5, 45,
//     45.5, 46, 47, 47.5,
//   ];

//   return (
//     <>
//       <div className=" relative top-[6vh]  md:top-[4vh] sticky-section w-full  md:flex  max-w-7xl mx-auto box-border  justify-start">
//         <div className="sticky-box md:h-[500px] flex items-start xl:justify-start justify-center md:sticky md:top-[9vh] md:mb-16">
//           {/* settop and sticky and mb and main is height for sticky */}
//           <ImageGallery
//             thumbnails={thumbnails} // Pass color images as thumbnails
//             mainImage={mainImage} // Pass current main image state
//             setMainImage={setMainImage} // Pass function to update the main image
//           />
//         </div>

//         {/* Product Info Component */}
//         <div className="md:w-[40%] lg:w-[28%]">
//           <ProductInfo
//             id={1}
//             title={"hero"} // Display name from API
//             description={`Men's Shoe`}
//             price={500} // Display price from API
//             sizes={sizes} // Use the original sizes list
//             colors={["#f6f6f6", "#f8f8f8"]} // Use colors from API
//             selectedSize={50}
//             setSelectedSize={50}
//             selectedColor={"#f6f6f6"} // Pass the selected color index
//             setSelectedColor={"#f6f6f6"} // Update function
//             mainImage={mainImage}
//             setMainImage={setMainImage} // Pass setMainImage to ProductInfo
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default page;
interface ProductPageProps {
  params: { productId: string };
}

export default function ProductPage({ params }: ProductPageProps) {
  return null;
}
