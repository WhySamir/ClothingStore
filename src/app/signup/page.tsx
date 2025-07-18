"use client";
import Link from "next/link";
const Signin = () => {
  return (
    <div className="mt-16 relative flex   items-center justify-center min-h-[90vh] ">
      {/* Glassmorphism Container backdrop-blur-lg */}
      <div className="bg-white/10  border border-white/30 shadow-lg rounded-xl p-4 w-[90vw] sm:w-[50vw] lg:w-[30vw]  2xl:w-[36vw] text-white">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Create your new account
        </h1>

        <form
          action={`/useactionstate`}
          method="POST"
          className="flex flex-col space-y-8"
        >
          <button
            type="submit"
            className="mt-2 bg-blue-600 hover:bg-blue-700 transition-all text-white font-bold py-3 rounded-lg w-full shadow-md"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-300">or</p>

          <button
            onClick={() => {
              console.log("baki");
            }}
            className="flex items-center justify-center space-x-3 bg-white/20 hover:bg-white/30 transition-all text-white border border-gray-400 py-3 rounded-lg w-full shadow-md"
          >
            <span className="font-bold cursor-default">
              Sign Up With Google
            </span>
          </button>
          <p className="text-center mt-4 text-gray-300">
            Already have an account on WatchFree?{" "}
            <Link
              href="/signin"
              className="text-blue-400 hover:text-blue-500 font-medium"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
