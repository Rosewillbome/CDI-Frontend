"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
function Navbtn({ hlink, label }) {
  const pathname = usePathname();
 
  return (
    <Link
      href={hlink}
      className={`mr-2 ml-2 text-black font-bold text-xl mt-6 hover:text-blue-600 ${
        pathname === hlink ? "border-b-2 border-blue-600" :""
      } `}
    >
      {label}
    </Link>
  );
}

export default Navbtn;
