export default function UsersPage() {
  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "user" },
    { id: 3, name: "Aman Gupta", email: "aman@example.com", role: "user" },
  ];

  return (
    <div className="space-y-8 font-[Lato]">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Users
        </h2>

        <button className="px-4 py-2 rounded-md text-sm font-medium bg-foreground text-background hover:opacity-90 transition-all duration-200">
          Add User
        </button>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          
          {/* Head */}
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Name</th>
              <th className="text-left px-6 py-3 font-medium">Email</th>
              <th className="text-left px-6 py-3 font-medium">Role</th>
              <th className="text-right px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-t border-border hover:bg-muted/40 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-foreground">
                  {user.name}
                </td>

                <td className="px-6 py-4 text-muted-foreground/90">
                  {user.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-foreground text-background"
                        : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4 text-right space-x-2">
                  <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-border hover:bg-accent transition-colors">
                    Edit
                  </button>

                  <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-destructive text-destructive hover:bg-destructive/10 transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}