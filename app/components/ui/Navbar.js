import React from "react";
import Navbtn from "./Navbtn";
import Image from "next/image";


function Navbar() {
  const navItems = [
    { path: "/", label: "home" },
    { path: "/dashboard", label: "dashboard" },
    { path: "/compare-districts", label: "compare districts" },
    { path: "/static-maps", label: "static maps" },
  ];
  return (
    <div className="bg-[#F1F1F1] flex justify-between items-center px-6 py-3">
      <div className="flex flex-col items-start">
        <h2 className="text-xl text-[#308DE0] font-thin">
          UGANDA NATIONAL DROUGHT
        </h2>
        <h1 className="text-3xl text-[#308DE0] font-bold">MONITORING TOOL</h1>
      </div>

      <div className="flex-1 flex justify-center items-center">
        {navItems?.map((data,index)=>(
          <Navbtn label={data?.label} hlink={data?.path} key={index}/>
        ))}
        
      </div>

      <div className="flex items-center mr-4">
        <Image
          src="/fao.png"
          alt="Logo"
          width={180}
          height={90}
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default Navbar;
