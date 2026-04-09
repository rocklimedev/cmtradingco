"use client";

import { useState } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
    { id: 3, name: "Aman Gupta", email: "aman@example.com", role: "user" },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "user",
  });

  const roleStyles = {
    admin: "bg-brand-red/10 text-brand-red border border-brand-red/20",
    user: "bg-muted text-muted-foreground border border-border",
  };

  const resetForm = () => setForm({ name: "", email: "", role: "user" });

  /* ---------------- ACTIONS ---------------- */

  const saveUser = () => {
    if (!form.name || !form.email) return;

    if (editing) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editing.id ? { ...u, ...form } : u)),
      );
    } else {
      setUsers((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
        },
      ]);
    }

    setShowModal(false);
    setEditing(null);
    resetForm();
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  /* ---------------- FILTER ---------------- */

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10 font-lato">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Users</h1>
            <p className="text-sm text-brand-muted">
              Manage platform users and roles
            </p>
          </div>

          <div className="flex gap-3">
            <input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 text-sm border border-border rounded-md bg-background"
            />

            <button
              onClick={() => {
                resetForm();
                setEditing(null);
                setShowModal(true);
              }}
              className="px-4 py-2 bg-brand-red text-white rounded-md text-sm"
            >
              + Add User
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-xs uppercase">
                <tr>
                  <th className="text-left px-6 py-4">User</th>
                  <th className="text-left px-6 py-4">Role</th>
                  <th className="text-right px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-muted/30">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-brand-muted">{user.email}</p>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full capitalize ${roleStyles[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setEditing(user);
                            setForm(user);
                            setShowModal(true);
                          }}
                          className="px-3 py-1.5 text-xs border rounded-md"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteUser(user.id)}
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

      {/* MODAL */}
      {showModal && (
        <Modal
          title={editing ? "Edit User" : "Add User"}
          onClose={() => setShowModal(false)}
        >
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <Input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full px-3 py-2 mt-2 border border-border rounded-md bg-background text-sm"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <Button onClick={saveUser}>
            {editing ? "Update User" : "Create User"}
          </Button>
        </Modal>
      )}
    </div>
  );
}

/* INPUT */
function Input(props) {
  return (
    <input
      {...props}
      className="w-full px-3 py-2 mt-2 border border-border rounded-md bg-background text-sm"
    />
  );
}

/* BUTTON */
function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full mt-3 px-4 py-2 bg-brand-red text-white rounded-md text-sm"
    >
      {children}
    </button>
  );
}

/* MODAL */
function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}
