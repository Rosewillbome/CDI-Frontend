"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardNav = () => {
  const pathname = usePathname();
   const navItems = [
    { path: "/dashboard/map-view", label: "Map View" },
    { path: "/dashboard/table-view", label: "Table View" },
    { path: "/dashboard/time-series", label: "Time Series" },
    { path: "/dashboard/detailed-view", label: "Detailed View" },
  ];

  return (
    <div className="relative">
      {/* Tabs Container */}
      <nav className="flex justify-end pr-4 ">
        {navItems.map((item, index) => (
          <Link
            key={item.path}
            href={item.path}
            className={`relative flex items-center justify-center px-6 py-3 text-white text-sm font-medium transition-all ${
              pathname === item.path ? "bg-[#002D62] font-bold" : "bg-[#4A8BD0] hover:bg-white hover:text-[#4A8BD0]" 
            } ${index !== navItems.length - 1 ? 'mr-[-10px]' : ''} `}
            style={{
              clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
              minWidth: "140px",
              textAlign: "center",
              zIndex: `${navItems.length - index}`,
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
