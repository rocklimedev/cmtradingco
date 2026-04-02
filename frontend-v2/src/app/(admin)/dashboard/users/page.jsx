"use client";

export default function UsersPage() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
    { id: 3, name: "Aman Gupta", email: "aman@example.com", role: "user" },
  ];

  const roleStyles = {
    admin: "bg-brand-red/10 text-brand-red border border-brand-red/20",
    user: "bg-muted text-muted-foreground border border-border",
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10 font-lato">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Users</h1>
            <p className="text-sm text-brand-muted mt-1">
              Manage platform users and roles
            </p>
          </div>

          <button className="px-4 py-2 rounded-md text-sm bg-brand-red text-white hover:opacity-90">
            + Add User
          </button>
        </div>

        {/* TABLE CARD */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* HEAD */}
              <thead className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-6 py-4">User</th>
                  <th className="text-left px-6 py-4">Role</th>
                  <th className="text-right px-6 py-4">Actions</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-border hover:bg-muted/30 transition"
                  >
                    {/* USER */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{user.name}</span>
                        <span className="text-xs text-brand-muted">
                          {user.email}
                        </span>
                      </div>
                    </td>

                    {/* ROLE */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium capitalize ${roleStyles[user.role]}`}
                      >
                        {user.role}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">

                        <button className="px-3 py-1.5 text-xs rounded-md border border-border hover:bg-accent transition">
                          Edit
                        </button>

                        <button className="px-3 py-1.5 text-xs rounded-md border border-destructive text-destructive hover:bg-destructive/10 transition">
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
    </div>
  );
}