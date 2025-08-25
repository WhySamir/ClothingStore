import Link from "next/link";
import { prisma } from "../lib/prisma";
// import ShowUserData from "../(admin)/admin_components/ShowUserData";

export default async function Page() {
  const customer = await prisma.customer.findMany();
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center w-full text-center">
      <h1 className="text-5xl"> Customer({customer.length})</h1>
      {customer.map((c) => (
        <div key={c.id} className="text-2xl">
          <p>
            <Link href={`/customer/${c.id}`}>{c.name}</Link>
          </p>
        </div>
      ))}
      {/* <ShowUserData /> */}
    </div>
  );
}
