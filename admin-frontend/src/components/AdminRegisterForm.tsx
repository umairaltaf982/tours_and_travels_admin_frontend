"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AdminRegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5005";
      const res = await fetch(`${backendUrl}/api/admin/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");
      setSuccess(true);
      // Optionally, redirect to login or show a message
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
      <h2 className="text-3xl font-extrabold text-center mb-2 text-gray-900 tracking-tight">Admin Register</h2>
      <p className="text-center text-gray-500 mb-6">Create your admin account</p>
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-900 bg-gray-50"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-900 bg-gray-50"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Password</label>
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition text-gray-900 bg-gray-50"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm text-center font-medium">{error}</div>}
      {success && <div className="text-green-600 text-sm text-center font-medium">Registration successful! <Link href="/admin/login" className="underline text-green-700">Login</Link></div>}
      <button
        type="submit"
        className="w-full py-2.5 rounded-lg bg-green-600 text-white font-bold text-lg hover:bg-green-700 transition disabled:opacity-50 shadow-md mt-2"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
      <div className="text-center mt-4">
        <span className="text-gray-600">Already have an account? </span>
        <Link href="/admin/login" className="text-green-600 hover:underline font-semibold">Login</Link>
      </div>
    </motion.form>
  );
} 