// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-orange-950 mt-8 text-[#f6f6f6]  ">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8 grid grid-cols-1 md:grid-cols-6 gap-16">
        {/* Logo & Description */}
        <div className="col-span-2">
          <div className="flex items-center  space-x-2 mb-4">
            <div className="w-10 h-10 bg-[#F4D3B4] rounded-full flex items-center justify-center text-[#4A2C1A] font-bold text-xl">
              C
            </div>
            <span className="font-bold text-xl text-white">Clothing.</span>
          </div>
          <p className="text-sm mb-4 max-w-120">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi,
            non quos quam repellat nesciunt porro enim sequi consequatur saepe
            iure tempora deleniti minima modi, eveniet veritatis dolore corrupti
            libero. Pariatur.
          </p>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Services */}
        <div>
          <h3 className="font-semibold text-white mb-4">Customer Services</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link href="/account" className="hover:underline">
                My Account
              </Link>
            </li>
            <li>
              <Link href="/orders" className="hover:underline">
                Track Your Order
              </Link>
            </li>

            <li>
              <Link href="/faq" className="hover:underline">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Our Information */}
        <div>
          <h3 className="font-semibold text-white mb-4">Our Information</h3>
          <ul className="space-y-4 text-sm">
            <li>
              <Link href="/terms" className="hover:underline">
                User Terms & Condition
              </Link>
            </li>
            <li>
              <Link href="/return-policy" className="hover:underline">
                Return Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold text-white mb-4">Contact Info</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="tel:+0123456789" className="hover:underline">
                +0123-456-789
              </a>
            </li>
            <li>
              <a href="mailto:example@gmail.com" className="hover:underline">
                example@gmail.com
              </a>
            </li>
            <li>
              8502 Ichi Tole.
              <br />
              Gwarko, 9768445916
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto  border-t border-[#6A3E2A] pb-8 pt-6 px-6 flex flex-col md:flex-row items-center justify-between text-sm">
        <p>
          Copyright &copy; {new Date().getFullYear()} Clothing Website Design.
          All Rights Reserved.
        </p>
        <div className="justify-start flex space-x-4 my-4 md:mt-0">
          <select className="bg-transparent border border-[#6A3E2A] rounded px-2 py-1">
            <option className="bg-orange-950">English</option>
            <option className="bg-orange-950">UK</option>
          </select>
          <select className="bg-transparent border border-[#6A3E2A] rounded px-2 py-1">
            <option className="bg-orange-950">USD</option>
            <option className="bg-orange-950">Rs</option>
          </select>
        </div>
      </div>
    </footer>
  );
}
