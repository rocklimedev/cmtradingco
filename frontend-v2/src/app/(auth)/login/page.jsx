"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { LOGO_WHITE, LOGO_RED, navLinks } from "@/lib";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      localStorage.setItem("token", data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 font-lato">
      {/* 🔴 LEFT BRAND PANEL */}
      <div className="hidden lg:flex flex-col justify-between bg-brand-red text-white p-12 relative overflow-hidden">
        <div className="text-2xl font-semibold">
          <img
            src={LOGO_WHITE}
            alt="Chhabra Marble"
            className="h-12 w-auto object-contain"
          />
        </div>

        {/* subtle glow */}
        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] bg-white/20 blur-3xl rounded-full" />
      </div>

      {/* 🧊 RIGHT FORM */}
      <div className="flex items-center justify-center bg-background px-6">
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-2xl shadow-xl p-8 space-y-6">
            {/* HEADER */}
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">Welcome back</h2>
              <p className="text-sm text-brand-muted">
                Login to your admin dashboard
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* EMAIL */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full px-3 pt-5 pb-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <label
                  className="absolute left-3 top-2 text-xs text-brand-muted transition-all 
                  peer-placeholder-shown:top-3.5 
                  peer-placeholder-shown:text-sm 
                  peer-focus:top-2 
                  peer-focus:text-xs"
                >
                  Email
                </label>
              </div>

              {/* PASSWORD */}
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder=" "
                  className="peer w-full px-3 pt-5 pb-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <label
                  className="absolute left-3 top-2 text-xs text-brand-muted transition-all 
                  peer-placeholder-shown:top-3.5 
                  peer-placeholder-shown:text-sm 
                  peer-focus:top-2 
                  peer-focus:text-xs"
                >
                  Password
                </label>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="group w-full flex items-center justify-center gap-2 py-3 rounded-md text-sm font-medium bg-brand-red text-white shadow-md hover:shadow-lg transition-all disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Login"}
                {!loading && (
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </form>
          </div>

          {/* FOOTER */}
          <p className="text-center text-xs text-brand-muted mt-6">
            Protected system • Authorized access only
          </p>
        </div>
      </div>
    </div>
  );
}
