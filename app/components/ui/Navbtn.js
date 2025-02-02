"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
function Navbtn({ hlink, label }) {
  const pathname = usePathname();
  function containsDashboard(sentence) {
    return /\bdashboard\b/i.test(sentence);
  }
  function isActive(sentence) {
    if (sentence === hlink) {
      return true;
    }
    // else if (containsDashboard(sentence)) {
    //   return true;
    // }
    else {
      return false;
    }
  }
  return (
    <Link
      href={hlink}
      className={`mr-2 ml-2 text-black font-bold text-xl mt-6 hover:text-blue-600 ${
        isActive(pathname) ? "border-b-2 border-blue-600" : ""
      } `}
    >
      {label}
    </Link>
  );
}

export default Navbtn;
