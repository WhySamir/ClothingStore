"use client";
import Link from "next/link";
import { useRef } from "react";

const Signin = () => {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* {isOpen && ( */}
      <div className="relative  flex items-center justify-center min-h-[100dvh] mt-12">
        <div
          ref={menuRef}
          className="bg-red-500 h-full flex flex-col  border border-white/30 shadow-lg rounded-xl p-4 w-[90vw] sm:w-[50vw] lg:w-[30vw]  2xl:w-[36vw] "
        >
          <h1 className="text-2xl font-semibold text-center my-8">
            Log in to your account
          </h1>

          <form action={"hero"} method="POST" className="flex flex-col gap-8">
            <button
              onClick={() => {
                console.log("baki");
              }}
              className="flex items-center justify-center space-x-3  mt-3 transition-all text-black border border-gray-400 py-3 rounded-lg w-full shadow-md"
            >
              <span className="font-bold cursor-default">
                Sign In With Google
              </span>
            </button>
            {/* </div> */}

            <p className="text-center mt-4 text-gray-300">
              New to WatchFree?{" "}
              <Link
                href="/signup"
                className="text-blue-400 hover:text-blue-500 font-medium"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Signin;
