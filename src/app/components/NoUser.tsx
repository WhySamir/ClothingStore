import SignInButton from "./buttons/SignInButton";

const NoUser = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          You are not logged in
        </h2>

        <p className="text-gray-600 mb-6">
          Please login to view and manage your saved products.
        </p>

        <div className=" flex flex-col sm:flex-row gap-3 justify-center">
          <SignInButton
            className=" px-5 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 "
            buttonText="Login"
          />
          <a
            href="/"
            className="px-5 py-2 rounded-md border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NoUser;
