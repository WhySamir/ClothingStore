"use client";
import { useAuth } from "@/app/auth-context";
import Image from "next/image";

const Page = () => {
  const { customer, user } = useAuth();
  return (
    <div>
      <div className="flex items-center justify-between mb-4 ">
        <div>
          <h1 className="text-3xl font-bold ">Dashboard</h1>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className="relative w-8 h-8 bg-blue-500 rounded-full">
            <Image
              src={customer?.userAvatarUrl || "/"}
              fill
              alt="user account"
              className="rounded-full object-contain text-blue-500"
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <div className="userName text-sm">{user?.user_metadata?.name}</div>
            <div className=" text-xs ">Admin</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
