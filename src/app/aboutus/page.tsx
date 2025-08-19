import Image from "next/image";
import PageHeader from "../components/PageHeader";

const stats = [
  { value: "25+", label: "Years" },
  { value: "180+", label: "Stores" },
  { value: "100k+", label: "Customers" },
  { value: "35+", label: "Awards" },
  { value: "98+", label: "Satisfied" },
];

export default function Page() {
  return (
    <>
      <PageHeader title="About Us" path="About Us" />;
      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex flex-col items-center  sm:mb-12">
          <div className="max-w-4xl w-full text-center mb-12">
            <p className="text-sm text-muted-foreground mb-4 tracking-wide">
              Our Story
            </p>
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-8 leading-tight">
              Crafted with Care: Fine Materials, Thoughtful Design
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            {/* Signature */}
            <div className="flex flex-col items-center">
              <div
                className="text-2xl font-light text-foreground mb-2"
                style={{ fontFamily: "cursive" }}
              >
                Jenny Alexander
              </div>
              <p className="text-sm text-muted-foreground">
                Jenny Alexander • CEO
              </p>
            </div>
          </div>
        </div>
        {/* Image Grid */}
        <div className="flex flex-col sm:grid grid-cols-2 gap-4 mb-8">
          <div className="aspect-[4/5] sm:aspect-auto relative">
            <Image
              src="/aboutus1.jpg"
              alt="Designer working at desk"
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col sm:grid grid-rows-2 gap-4">
            <div className="aspect-[3/2] relative">
              <Image
                src="/aboutus2.jpg"
                alt="Design studio workspace"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="aspect-[3/2] relative ">
              <Image
                src="/aboutus3.jpg"
                alt="Designer at work"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Statistics Bar */}
        <div className="bg-yellow-400  p-8">
          <div className="flex flex-col sm:grid grid-cols-5 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="text-black">
                <div className="text-2xl md:text-3xl font-bold mb-1">
                  {stat.value}
                </div>
                <div className="text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
