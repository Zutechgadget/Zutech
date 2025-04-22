
"use client";

import React, { useContext, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "@/context/UserContext";

const Account = () => {
  const { user, logout } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login if no token
    }
  }, [router]);

  if (!user) {
    return (
      <div className="container mt-5">
        <h2>Please Log In</h2>
        <p>You need to be logged in to view your account details.</p>
        <Link href="/login" className="btn btn-primary">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Account Details</h2>
      <div className="card p-4">
        <h4>Welcome, {user.name || "User"}!</h4>
        <p><strong>Email:</strong> {user.email || "Not provided"}</p>
        <p><strong>Phone:</strong> {user.phone || "Not provided"}</p>
        <p><strong>Address:</strong> {user.address || "Not provided"}</p>
        <button className="btn btn-danger mt-3" onClick={logout}>Log Out</button>
      </div>
      <Link href="/" className="btn btn-secondary mt-3">Back to Home</Link>
    </div>
  );
};

export default Account;
