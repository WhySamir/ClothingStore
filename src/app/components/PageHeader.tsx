import Link from "next/link";

interface PageHeaderProps {
  title: string;
  path: string;
}

export default function PageHeader({ title, path }: PageHeaderProps) {
  return (
    <div className="relative bg-gray-100 py-6 md:py-12 px-4">
      {/* <img
          src="/dts"
          alt="decoration"
          className="absolute top-0  left-1/2 -translate-x-1/2 w-32 h-16"
        />
        <img
          src="/dts-bottom-left.png"
          alt="decoration"
          className="absolute bottom-0 left-1/4 translate-y-1/2 w-32 h-16"
        /> */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
            backgroundSize: "20px 20px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto text-center">
        <h1 className="text-4xl  font-bold text-gray-900 mb-4">{title}</h1>
        <nav className="text-gray-600 text-sm md:text-base">
          <Link href="/" className="hover:text-gray-900 cursor-pointer">
            Home
          </Link>
          <span className="mx-2 tracking-wider text-gray-900">{path}</span>
        </nav>
      </div>
    </div>
  );
}
