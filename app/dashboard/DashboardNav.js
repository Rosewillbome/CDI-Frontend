"use client";
import React from "react";
import { useSideberStore } from "../store/useSideberStore";
const DashboardNav = ({ selectedTab, setSelectedTab }) => {
  const navItems = [
    { path: "map-view", label: "Map View" },
    { path: "table-view", label: "Table View" },
  ];

  const { setTabs } = useSideberStore((state) => state);
  console.log("selectedTab ", selectedTab);
  const selectTabs = (e, item) => {
    e.preventDefault();
    setTabs(item.path);
    setSelectedTab(item.path);
  };

  return (
    <div className="relative mt-[-10px]">
      <nav className="flex justify-center mt-6">
        {navItems.map((item, index) => (
          <button
            key={item.path}
            className={`relative flex items-center justify-center px-4 py-2 text-sm font-medium transition-all border ${
              selectedTab === item.path
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
            onClick={(e) => selectTabs(e,item)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default DashboardNav;
