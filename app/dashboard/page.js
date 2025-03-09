"use client";
import Image from "next/image";
import { useState } from "react";
import DashboardNav from "./DashboardNav";
import Sidebar from "./Sidebar";
// import MapView from "./MapView";
import TableView from "./TableView";
import MapView from "./MapView";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState("map-view");
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <DashboardNav
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
          <div className="p-6">
            {selectedTab === "map-view" ? (
              <MapView />
            ) : selectedTab === "table-view" ? (
              <TableView />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
