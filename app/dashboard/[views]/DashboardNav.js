"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardNav = () => {
  const pathname = usePathname();
  const navItems = [
    { path: "/dashboard/map-view", label: "Map View" },
    { path: "/dashboard/table-view", label: "Table View" },
  ];

  return (
    <div className="relative">
      <nav className="flex justify-center mt-6">
        {navItems.map((item, index) => (
          <Link
            key={item.path}
            href={item.path}
            className={`relative flex items-center justify-center px-4 py-2 text-sm font-medium transition-all border ${
              pathname === item.path
                ? "bg-[#308DE0]  text-white border-[#308DE0] font-bold"
                : "bg-[#F1F1F1] text-[#308DE0] border-[#308DE0] "
            } ${
              index === 0
                ? "rounded-l-3xl"
                : index === navItems.length - 1
                ? "rounded-r-3xl"
                : "rounded-none"
            }`}
            style={{
              minWidth: "120px",
              textAlign: "center",
              marginLeft: index !== 0 ? "-1px" : "0",
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default DashboardNav;
