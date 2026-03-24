export default function QueriesPage() {
  const queries = [
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
  ];

  const statusStyles = {
    new: "bg-foreground text-background",
    "in-progress": "bg-secondary text-secondary-foreground",
    resolved: "bg-muted text-muted-foreground",
  };

  return (
    <div className="space-y-8 font-[Lato]">
      
      {/* Heading */}
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Customer Queries
      </h2>

      {/* Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          
          {/* Head */}
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="text-left px-6 py-3 font-medium">Name</th>
              <th className="text-left px-6 py-3 font-medium">Email</th>
              <th className="text-left px-6 py-3 font-medium">Message</th>
              <th className="text-left px-6 py-3 font-medium">Status</th>
              <th className="text-right px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {queries.map((q) => (
              <tr
                key={q.id}
                className="border-t border-border hover:bg-muted/40 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-foreground">
                  {q.name}
                </td>

                <td className="px-6 py-4 text-muted-foreground/90">
                  {q.email}
                </td>

                <td className="px-6 py-4 text-muted-foreground/90 max-w-sm truncate">
                  {q.message}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize ${statusStyles[q.status]}`}
                  >
                    {q.status.replace("-", " ")}
                  </span>
                </td>

                <td className="px-6 py-4 text-right space-x-2">
                  <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-border hover:bg-accent transition-colors">
                    View
                  </button>

                  <button className="px-3 py-1.5 text-xs font-medium rounded-md border border-border hover:bg-accent transition-colors">
                    Update
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