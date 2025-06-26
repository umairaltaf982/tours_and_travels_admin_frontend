"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      // TODO: handle successful login (e.g., redirect, store token)
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md space-y-7 animate-fadeIn border border-gray-200"
    >
      <h2 className="text-3xl font-extrabold text-center mb-2 text-gray-900 tracking-tight">Admin Login</h2>
      <p className="text-center text-gray-500 mb-6">Sign in to your admin account</p>
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-900 bg-gray-50"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-gray-900 bg-gray-50"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}
      <button
        type="submit"
        className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50 shadow-md mt-2"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <div className="text-center mt-4">
        <span className="text-gray-600">Don't have an account? </span>
        <Link href="/admin/register" className="text-blue-600 hover:underline font-semibold">Register</Link>
      </div>
    </motion.form>
  );
} 