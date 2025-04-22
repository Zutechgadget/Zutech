"use client";

import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import BigHead from "@/components/BigHead";
import Footer from "@/components/Footer";
import SingleProduct from "@/components/SingleProduct";
import Ipad from "@/app/ipad/page"; // Ensure path is correct
import { UserContext } from "@/context/UserContext";
import "@/styles/App.css";

export default function Dashboard() {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext); // Destructure user and setUser
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  // Check for token and user on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if no token
    } else {
      setIsLoading(false); // Token exists, allow rendering
    }
  }, [router]);

  // Logout function
  const logout = () => {
    localStorage.removeItem("token"); // Clear token
    setUser(null); // Clear user from context
    router.push("/login"); // Redirect to login
  };

  // Show loading state while checking token
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If no user, show a fallback (optional, depending on your context setup)
  if (!user) {
    return <div>Please log in to view the dashboard.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <BigHead />
      <h1 className="text-2xl font-bold text-center my-4">
        Welcome, {user?.name || "User"}
      </h1>
      <div className="container text-start my-1 mac-con">
        <div className="text-center px-1">
          <img
            className=""
            style={{
              width: "496px",
              height: "396px",
              borderRadius: "30px 0px 0px 0px",
              opacity: 1, // Set opacity to 1 for visibility
            }}
            alt="Dashboard Image"
            src="https://res.cloudinary.com/dvfiw24p4/image/upload/v1744819957/Screenshot_2025-04-16_at_16.40.36_egzic8.png"
          />
        </div>
      </div>
      <Ipad />
      <div className="bg-white">
        <SingleProduct />
      </div>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 my-4 mx-4"
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}