"use client";
import Image from "next/image";
import DashboardNav from "./DashboardNav";
import Sidebar from "./Sidebar";
import MapView from "./MapView";
import TableView from "./TableView";


import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <DashboardNav />
          <div className="p-6">
            {pathname === "/dashboard/map-view" ? (
              <MapView />
            ) : pathname === "/dashboard/table-view" ? (
              <TableView />
            
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
