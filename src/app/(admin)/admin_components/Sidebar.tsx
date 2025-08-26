"use client";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  PanelLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "products",
    label: "Products",
    icon: Package,
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
  },
  {
    id: "customers",
    label: "Customers",
    icon: Users,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-[#121212] text-[#E0E0E0] border-r  border-[#2C2C2C]">
      {/* Logo/Brand */}
      <div className="flex items-center justify-between px-4 py-6  ">
        <div className="flex items-center justify-between gap-2">
          <div className="relative w-8 h-8 rounded-md flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-md p-[1.1px] "
              style={{
                background:
                  "conic-gradient(from 0deg,  rgba(255,255,255,0.6),rgba(255,255,255,0.2), rgba(255,255,255,0.6)",
              }}
            >
              {/* Inner mask to simulate border */}
              <div className="w-full h-full rounded-md bg-neutral-800"></div>
            </div>

            <span className="relative text-[#E0E0E0] font-semibold text-xl text-center [font-family:var(--font-poppins)]">
              C
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold [font-family:var(--font-poppins)] ">
              ClodeX
            </h1>
          </div>
        </div>
        <div className="place-content-end place-items-end">
          <PanelLeft />
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="m-2 ">
        <h1 className="text-[#9CA3AF] text-xs p-2">MAIN MENU</h1>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === `/admin/${item.id}`;

            return (
              <li key={item.id} className="relative">
                <Link
                  href={`/admin/${item.id}`}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
                    ${
                      isActive
                        ? "bg-gradient-to-r from-[#2b2556] to-[#151516] text-[#E0E0E0] relative"
                        : "text-[#9CA3AF] hover:bg-gradient-to-r hover:from-[#2b2556] hover:to-[#151516] hover:text-[#E0E0E0]"
                    }
                  `}
                >
                  <Icon className="h-5 w-5 z-10" />
                  {isActive && (
                    <span className="absolute left-0 top-2.5 h-3/5 w-[3px]  bg-[#4e4785] rounded-r-md"></span>
                  )}
                  <span className="font-medium z-10">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
