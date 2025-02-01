import Image from "next/image";
import { redirect } from "next/navigation";
export default function Home() {
  redirect(`/dashboard/map-view`);
  // return <div className="min-h-screen bg-gray-50"></div>;
}
