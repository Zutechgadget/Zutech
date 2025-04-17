"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BigHead from "@/components/BigHead";
import Footer from "@/components/Footer";
import SingleProduct from "../../components/SingleProduct";
import "@/styles/App.css";
import Ipad from "@/app/ipad/page.js";
import CardCarousel from "@/components/Carousel";

export default function Dashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <BigHead />

      <div className="mb-5 mx-4 text-center pb-5">
        <CardCarousel />
      </div>

      <div className="mt-5 pt-5">
        <Ipad />
      </div>

      <div className="bg-white">
        <SingleProduct />
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 my-4 mx-4 self-start"
      >
        Logout
      </button>

      <Footer />
    </div>
  );
}
