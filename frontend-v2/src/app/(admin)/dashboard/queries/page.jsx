"use client";

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
    new: "bg-brand-red/10 text-brand-red border border-brand-red/20",
    "in-progress":
      "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20",
    resolved:
      "bg-green-500/10 text-green-600 border border-green-500/20",
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10 font-lato">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Customer Queries
          </h1>
          <p className="text-sm text-brand-muted mt-1">
            Manage and respond to incoming customer requests
          </p>
        </div>

        {/* TABLE CARD */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              {/* HEAD */}
              <thead className="bg-muted/40 text-muted-foreground text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left px-6 py-4">Customer</th>
                  <th className="text-left px-6 py-4">Message</th>
                  <th className="text-left px-6 py-4">Status</th>
                  <th className="text-right px-6 py-4">Actions</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {queries.map((q) => (
                  <tr
                    key={q.id}
                    className="border-t border-border hover:bg-muted/30 transition"
                  >
                    {/* CUSTOMER */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{q.name}</span>
                        <span className="text-xs text-brand-muted">
                          {q.email}
                        </span>
                      </div>
                    </td>

                    {/* MESSAGE */}
                    <td className="px-6 py-4 max-w-md">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {q.message}
                      </p>
                    </td>

                    {/* STATUS */}
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium capitalize ${statusStyles[q.status]}`}
                      >
                        {q.status.replace("-", " ")}
                      </span>
                    </td>

                    {/* ACTIONS */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">

                        <button className="px-3 py-1.5 text-xs rounded-md border border-border hover:bg-accent transition">
                          View
                        </button>

                        <button className="px-3 py-1.5 text-xs rounded-md border border-border hover:bg-accent transition">
                          Update
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