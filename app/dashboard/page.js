"use client";
import Image from "next/image";
import { useState,useEffect } from "react";
import DashboardNav from "./DashboardNav";
import Sidebar from "./Sidebar";
// import MapView from "./MapView";
import TableView from "./TableView";
import MapView from "./MapView";
import { useSideberStore } from "../store/useSideberStore";
import axios from "axios";

export default function Home() {
  const { setSliderYear, setLastCountMonth } = useSideberStore(
    (state) => state
  );
  const [selectedTab, setSelectedTab] = useState("map-view");

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(`${process.env.NEXT_PUBLIC_API}data/district/assessment/count`)
        .then((response) => {
          console.log("setAssesment", response?.data?.data);
          setSliderYear(
            response?.data?.data[response?.data?.data?.length - 1]?.[1]
          );
          setLastCountMonth(
            response?.data?.data[response?.data?.data?.length - 1]?.[0]?.trim()
          );
        })
        .catch((error) => {
          console.error("comming error", error);
        });
    };
    fetchData();
  }, []);
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
