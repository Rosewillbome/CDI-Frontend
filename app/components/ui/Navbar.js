import React from "react";
import Navbtn from "./Navbtn";
import Image from "next/image";

function Navbar() {
  const navItems = [
    { path: "/", label: "Overview" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/compare-districts", label: "Comparison" },
    { path: "/static-maps", label: "Maps" },
    { path: "/help", label: "Help Center" },
  ];

  return (
    <div className="bg-gray-100 shadow-md border border-blue-100 flex justify-between items-center px-8 py-4">
      {/* Left Section - Title */}
      <div className="flex items-start">
        <Image
          src="/fao.png"
          alt="FAO Logo"
          width={200}
          height={100}
          className="object-contain"
        />
      </div>

      {/* Center Section - Navigation */}
      <nav className="flex ml-10 md:ml-40">
        {navItems.map((data, index) => (
          <Navbtn
            key={index}
            label={data.label}
            hlink={data.path}
            index={index}
          />
        ))}
      </nav>

      {/* Right Section - Logo */}
      <div className="flex flex-col items-center">
        <h2 className="text-lg text-[#308DE0] font-light tracking-wide uppercase">
          Uganda National Drought
        </h2>
        <h1 className="text-2xl md:text-3xl text-[#308DE0] font-semibold uppercase">
          Monitoring Tool
        </h1>
      </div>
    </div>
  );
}

export default Navbar;
