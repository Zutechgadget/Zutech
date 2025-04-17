"use client";

import { useState } from "react";
import axios from "axios";
import BigHead from "@/components/BigHead";
import Footer from "@/components/Footer";
import '@/styles/App.css'

export default function ResetPassword() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      setLoading(true);
      const { data } = await axios.post("https://zutech-api.onrender.com/api/users/reset-password", form);
      setMessage(data || "Password reset successful.");
      setForm({ email: "", password: "" });
    } catch (err) {
      console.error(err);
      setError(err.response?.data || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <BigHead className="" />
      <div className="min-h-screen flex items-center justify-center bg-white py-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded text-center shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl mb-4 font-semibold text-center">Reset Password</h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Enter your email and new password to reset it.
          </p>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="block w-full p-2 border rounded mb-4"
            required
          />
<br/>
          <input
            type="password"
            name="password"
            placeholder="New Password"
            value={form.password}
            onChange={handleChange}
            className="block w-full p-2 border rounded mb-4"
            required
          />

          {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
<br/>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
      <Footer className="" />
    </div>
  );
}
