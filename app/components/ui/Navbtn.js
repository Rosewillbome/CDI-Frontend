"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbtn({ hlink, label, index }) {
  const pathname = usePathname();
  const isActive = pathname === hlink;
  const isEven = index % 2 === 0;

  const clipPathStyle = isEven
    ? "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)"
    : "polygon(0% 0%, 100% 0%, 90% 100%, 10% 100%)";

  return (
    <Link href={hlink} passHref>
      <div
        className="w-32 h-12 flex items-center justify-center font-bold text-lg transition-all"
        style={{
          clipPath: clipPathStyle,
          backgroundColor: isActive ? "white" : "#308DE0",
          color: isActive ? "#308DE0" : "white",

          display: "inline-flex",
          textAlign: "center",
          padding: 0,
          margin: 0,
          lineHeight: "48px",
        }}
      >
        {label}
      </div>
    </Link>
  );
}

export default Navbtn;
