"use client";

import { useState } from "react";

export default function QueriesPage() {
  const [queries, setQueries] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@example.com",
      message: "Need pricing for marble flooring.",
      status: "new",
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya@example.com",
      message: "Looking for bathroom tiles.",
      status: "in-progress",
    },
    {
      id: 3,
      name: "Amit Singh",
      email: "amit@example.com",
      message: "Bulk order for granite.",
      status: "resolved",
    },
  ]);

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const statusStyles = {
    new: "bg-brand-red/10 text-brand-red border border-brand-red/20",
    "in-progress":
      "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20",
    resolved: "bg-green-500/10 text-green-600 border border-green-500/20",
  };

  /* ---------------- ACTIONS ---------------- */

  const deleteQuery = (id) => {
    setQueries((prev) => prev.filter((q) => q.id !== id));
  };

  const updateStatus = (id, status) => {
    setQueries((prev) => prev.map((q) => (q.id === id ? { ...q, status } : q)));
  };

  /* ---------------- FILTER ---------------- */

  const filtered = queries.filter((q) => {
    const matchesSearch =
      q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "all" || q.status === filter;

    return matchesSearch && matchesFilter;
  });

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10 font-lato">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-semibold">Customer Queries</h1>
            <p className="text-sm text-brand-muted">
              Manage and respond to incoming requests
            </p>
          </div>

          {/* FILTERS */}
          <div className="flex gap-3">
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 text-sm border border-border rounded-md bg-background"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-2 text-sm border border-border rounded-md bg-background"
            >
              <option value="all">All</option>
              <option value="new">New</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase">
                <tr>
                  <th className="text-left px-6 py-4">Customer</th>
                  <th className="text-left px-6 py-4">Message</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-right px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((q) => (
                  <tr key={q.id} className="border-t hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{q.name}</p>
                        <p className="text-xs text-brand-muted">{q.email}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4 max-w-md">
                      <p className="line-clamp-2 text-muted-foreground">
                        {q.message}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full capitalize ${statusStyles[q.status]}`}
                      >
                        {q.status.replace("-", " ")}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setSelected(q)}
                          className="px-3 py-1.5 text-xs border rounded-md"
                        >
                          View
                        </button>

                        <button
                          onClick={() => deleteQuery(q.id)}
                          className="px-3 py-1.5 text-xs border border-destructive text-destructive rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* VIEW MODAL */}
      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <h2 className="text-lg font-semibold">{selected.name}</h2>
          <p className="text-sm text-brand-muted">{selected.email}</p>

          <div className="mt-4 text-sm">{selected.message}</div>

          {/* STATUS UPDATE */}
          <select
            value={selected.status}
            onChange={(e) => {
              updateStatus(selected.id, e.target.value);
              setSelected({ ...selected, status: e.target.value });
            }}
            className="w-full mt-4 px-3 py-2 border rounded-md"
          >
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </Modal>
      )}
    </div>
  );
}

/* MODAL */
function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md space-y-4">
        <button onClick={onClose} className="ml-auto block text-sm">
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
