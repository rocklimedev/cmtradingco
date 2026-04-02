"use client";

import { useState } from "react";

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
    <div className="min-h-screen flex items-center justify-center bg-background px-6 font-lato">
      <div className="w-full max-w-md">

        {/* CARD */}
        <div className="bg-card border border-border rounded-xl p-8 space-y-6">

          {/* HEADER */}
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              Admin Login
            </h1>
            <p className="text-sm text-brand-muted">
              Access dashboard
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <div className="space-y-1">
              <label className="text-xs text-brand-muted">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-1">
              <label className="text-xs text-brand-muted">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-md text-sm font-medium bg-brand-red text-white hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>

          </form>
        </div>

        {/* FOOTER */}
        <p className="text-center text-xs text-brand-muted mt-6">
          Admin access only
        </p>

      </div>
    </div>
  );
}