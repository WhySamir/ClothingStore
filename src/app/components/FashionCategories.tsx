"use client";

const FashionCategories = () => {
  const features = [
    {
      icon: "./Package",
      title: "Free Shipping",
      description: "Free shipping for order above £100",
    },
    {
      icon: "./CreditCard",
      title: "Flexible Payment",
      description: "Multiple secure payment options",
    },
    {
      icon: "./Headphones",
      title: "24x7 Support",
      description: "We support online all days.",
    },
  ];

  const womenCategories = [
    "T-Shirts and Blouses",
    "Dresses",
    "Jackets & Coats",
    "Jeans",
    "Shoes",
  ];

  const menCategories = ["T-Shirts and Shirts", "Jackets & Coats", "Jeans"];

  return (
    <div className="my-12 max-w-7xl mx-auto px-4 py-8">
      {/* Features Section */}
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100"
          >
            <div className="p-3 bg-orange-100 rounded-xl">
              {/* <feature.icon /> */}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Womens Section */}
        <div
          style={{
            backgroundImage: "url('/freepick.png')",
            backgroundPosition: "calc(100% - 40px) 30px", // 20px from right
            backgroundRepeat: "no-repeat", // don't tile
            backgroundSize: "220px auto",
            // "url('https://res.cloudinary.com/dcfrlqakq/image/upload/f_auto,q_auto,w_1000,c_fill,g_auto,e_sharpen,e_saturation:30/v1754908581/photo-1483985988355-763728e1935b_icxxqo.jpg')",
            // "url('https://res.cloudinary.com/dcfrlqakq/image/upload/f_auto/q_auto/w_650/c_fill/g_auto/e_sharpen/v1754909322/3080381c-1ed1-42f2-beda-b4edf3f331f0-converted_q3iius.png')",
          }}
          className="bg-[#f6f6f6]   relative  rounded-3xl p-8 overflow-hidden group hover:shadow-xl transition-all duration-500"
        >
          <div className="z-10 flex-1 max-w-lg">
            <div className="mb-4">
              <span className="text-sm font-medium  bg-white px-3 py-2 rounded-full">
                2500+ Items
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4 transition-colors duration-300">
              For Women&apos;s
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed max-w-60">
              Discover our curated collection of women&apos;s fashion, for every
              occasion.
            </p>

            <ul className="space-y-3">
              {womenCategories.map((category, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 hover:text-black cursor-pointer transition-colors duration-200"
                >
                  <div className="w-1.5 h-1.5 bg-black rounded-full mr-3 opacity-70"></div>
                  <span className="font-medium">{category}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Decorative Image Placeholder */}
          <div className="absolute -left-4 -bottom-4 w-32 h-32 bg-gradient-to-br from-blue-200 to-gray-200 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-700"></div>
          {/* <div className="absolute -right-4 -bottom-4 w-40 h-40 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-700"></div> */}
        </div>

        {/* Men's and Accessories Container */}
        {/* Men's Section */}
        <div
          style={{
            backgroundImage: "url('/freemen.png')",
            backgroundPosition: "calc(100% - 10px) 30px", // 20px from right
            backgroundRepeat: "no-repeat", // don't tile
            backgroundSize: "300px auto",
            // "url('https://res.cloudinary.com/dcfrlqakq/image/upload/f_auto,q_auto,w_1000,c_fill,g_auto,e_sharpen,e_saturation:30/v1754908581/photo-1483985988355-763728e1935b_icxxqo.jpg')",
            // "url('https://res.cloudinary.com/dcfrlqakq/image/upload/f_auto/q_auto/w_650/c_fill/g_auto/e_sharpen/v1754909322/3080381c-1ed1-42f2-beda-b4edf3f331f0-converted_q3iius.png')",
          }}
          className="bg-[#f6f6f6]   relative  rounded-3xl p-8 overflow-hidden group hover:shadow-xl transition-all duration-500"
        >
          {/* <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-gray-100/30 opacity-0  transition-opacity duration-500"></div> */}

          <div className="z-10 flex-1 max-w-lg">
            <div className="mb-4">
              <span className="text-sm font-medium  bg-white px-3 py-2 rounded-full">
                1500+ Items
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4 transition-colors duration-300">
              For Men&apos;s
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed max-w-60">
              Discover our curated collection of women&apos;s fashion, for every
              occasion.
            </p>

            <ul className="space-y-3">
              {menCategories.map((category, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 hover:text-black cursor-pointer transition-colors duration-200"
                >
                  <div className="w-1.5 h-1.5 bg-black rounded-full mr-3 opacity-70"></div>
                  <span className="font-medium">{category}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-br from-blue-200 to-gray-200 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-700"></div>
        </div>

        {/* Accessories Section */}
      </div>
    </div>
  );
};

export default FashionCategories;
