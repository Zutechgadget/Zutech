"use client";

import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserContext } from "@/context/UserContext";
import BigHead from "@/components/BigHead";
import Footer from "@/components/Footer";
import "@/styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(UserContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://zutech-api.onrender.com/api/auth", {
        email,
        password,
      });
      console.log("Login API response:", response.data);
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      if (user.isAdmin) {
        router.push("/admindashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <BigHead />
      <div className="min-h-screen flex items-center justify-center text-center my-5 py-5 bg-white">
        <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow">
          <h2 className="text-2xl mb-4 text-center">Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full p-2 border rounded mb-2"
            required
          />
          <br/>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full p-2 border rounded mb-2"
            required
          />
          <p className="text-sm text-right mt-2">
            <a href="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
          <p className="mt-5 text-center">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}