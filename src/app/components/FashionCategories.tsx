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

  const accessoryCategories = ["Handbags", "Watches", "Sunglasses", "Hat"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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
        {/* Women's Section */}
        <div className="relative bg-gradient-to-br from-orange-50 to-pink-50 rounded-3xl p-8 overflow-hidden group hover:shadow-xl transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100/30 to-pink-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="mb-4">
              <span className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-2 rounded-full">
                2500+ Items
              </span>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4  transition-colors duration-300">
              For Women&apos;s
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Discover our curated collection of women&apos;s fashion, featuring
              <span className="font-medium text-gray-800">
                {" "}
                contemporary styles
              </span>
              , premium quality, and sustainable materials for every occasion.
            </p>

            <ul className="space-y-3">
              {womenCategories.map((category, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-700 hover:text-orange-600 cursor-pointer transition-colors duration-200"
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 opacity-70"></div>
                  <span className="font-medium">{category}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Decorative Image Placeholder */}
          <div className="absolute -right-4 -bottom-4 w-48 h-48 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute -right-8 top-4 w-24 h-24 bg-gradient-to-br from-pink-200 to-orange-200 rounded-full opacity-15 group-hover:scale-125 transition-transform duration-700"></div>
        </div>

        {/* Men's and Accessories Container */}
        <div className="flex flex-col gap-8">
          {/* Men's Section */}
          <div className="relative bg-gradient-to-br from-blue-50 to-gray-50 rounded-3xl p-8 overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-gray-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="mb-4">
                <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-2 rounded-full">
                  1500+ Items
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                For Men&apos;s
              </h2>

              <ul className="space-y-3">
                {menCategories.map((category, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200"
                  >
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3 opacity-70"></div>
                    <span className="font-medium">{category}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-gradient-to-br from-blue-200 to-gray-200 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-700"></div>
          </div>

          {/* Accessories Section */}
          <div className="relative bg-gradient-to-br from-amber-50 to-yellow-50 rounded-3xl p-8 overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/30 to-yellow-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <div className="mb-4">
                <span className="text-sm font-medium text-amber-600 bg-amber-100 px-3 py-2 rounded-full">
                  800+ Items
                </span>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors duration-300">
                Accessories
              </h2>

              <ul className="space-y-3">
                {accessoryCategories.map((category, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 hover:text-amber-600 cursor-pointer transition-colors duration-200"
                  >
                    <div className="w-2 h-2 bg-amber-400 rounded-full mr-3 opacity-70"></div>
                    <span className="font-medium">{category}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -right-4 -bottom-4 w-28 h-28 bg-gradient-to-br from-amber-200 to-yellow-200 rounded-full opacity-20 group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute -left-4 -top-4 w-20 h-20 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full opacity-15 group-hover:scale-125 transition-transform duration-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionCategories;
