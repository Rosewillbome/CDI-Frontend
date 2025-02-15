import React from "react";
import Navbtn from "./Navbtn";
import Image from "next/image";

function Navbar() {
  const navItems = [
    { path: "/", label: "Overview" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/compare-districts", label: "Comparison" },
    { path: "/static-maps", label: "Maps" },
  ];

  return (
    <div className="bg-gray-100 shadow-md flex justify-between items-center px-8 py-4">
      {/* Left Section - Title */}
      <div className="flex flex-col items-start">
        <h2 className="text-lg text-[#308DE0] font-light tracking-wide uppercase">
          Uganda National Drought
        </h2>
        <h1 className="text-2xl md:text-3xl text-[#308DE0] font-semibold uppercase ">
          Monitoring Tool
        </h1>
      </div>

      {/* Center Section - Navigation */}
      <nav className="flex-1 flex justify-center space-x-4">
        {navItems.map((data, index) => (
          <Navbtn
            key={index}
            label={data.label}
            hlink={data.path}
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
          />
        ))}
      </nav>

      {/* Right Section - Logo */}
      <div className="flex items-center">
        <Image
          src="/fao.png"
          alt="FAO Logo"
          width={150}
          height={80}
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default Navbar;
