import { prisma } from "@/app/lib/prisma";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const customer = await prisma.customer.findUnique({
    where: { id: id },
  });
  if (!customer) {
    return <div>Customer not found</div>;
  }
  return (
    <div>
      <h1 className="text-5xl">{customer.name}</h1>
    </div>
  );
};

export default page;
