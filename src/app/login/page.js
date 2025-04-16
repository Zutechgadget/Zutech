"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BigHead from "@/components/BigHead";
import Footer from "@/components/Footer";

import "@/styles/App.css"; // ✅ Use an alias

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post("https://zutech-api.onrender.com/api/auth", form);
      localStorage.setItem("token", data.token);
      router.push("/dashboard"); // Redirect after successful login
    } catch (error) {
      console.error(error.response?.data || "An error occurred");
      setErrorMessage(error.response?.data?.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <BigHead className=""/>
    <div className="min-h-screen flex items-center justify-center text-center my-5 py-5 bg-white ">
      <form onSubmit={handleSubmit} className="p-8 bg-white  rounded-lg">
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="block w-full p-2 border rounded mb-2"
          required
        />
        <br/>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="block w-full p-2 border rounded mb-2"
          required
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <br/>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
          
        </button>
        <p className="mt-5 text-center">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign Up
          </a>
        </p>
      </form>
    </div>

 
    <Footer className=""/>
    </div>
  );
}
