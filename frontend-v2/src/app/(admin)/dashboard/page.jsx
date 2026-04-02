"use client";

export default function DashboardPage() {
  const stats = [
    { title: "Total Products", value: "120" },
    { title: "Orders", value: "80" },
    { title: "Customers", value: "45" },
  ];

  const activities = [
    "New order placed",
    "Product added",
    "User registered",
  ];

  return (
    <div className="space-y-10 font-lato">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-brand-muted mt-1">
          Monitor platform performance and recent activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition"
          >
            <p className="text-sm text-brand-muted">
              {item.title}
            </p>

            <div className="flex items-end justify-between mt-3">
              <h3 className="text-3xl font-semibold">
                {item.value}
              </h3>

              <span className="text-xs text-brand-muted group-hover:text-foreground transition">
                View →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ACTIVITY */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold">
            Recent Activity
          </h3>
          <span className="text-xs text-brand-muted">
            Last updates
          </span>
        </div>

        <ul className="space-y-4">
          {activities.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm"
            >
              <span className="mt-1 h-2 w-2 rounded-full bg-brand-red" />
              <span className="text-muted-foreground">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}