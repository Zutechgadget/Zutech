"use client";

import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import BigHead from "@/components/BigHead";
import Footer from "@/components/Footer";
import { UserContext } from "@/context/UserContext";
import "@/styles/App.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("https://zutech-api.onrender.com/api/users", form);
      localStorage.setItem("token", data.token);
      setUser({
        name: data.user?.name || form.name,
        email: data.user?.email || form.email,
        isAdmin: data.user?.isAdmin || false,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error(error.response?.data || "An error occurred");
      setErrorMessage(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BigHead />
      <div className="min-h-screen flex items-center justify-center text-center my-5 py-5 bg-white">
        <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg">
          <h2 className="text-2xl mb-4 text-center">Sign Up</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="block w-full p-2 border rounded mb-2"
            required
          />
          <br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="block w-full p-2 border rounded mb-2"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="block w-full p-2 border rounded mb-2"
            required
          />
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          <br />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <p className="mt-5 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login
            </a>
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
}