"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  /* MOCK DATA (replace with API later) */
  const data = {
    products: 120,
    orders: 80,
    users: 45,
    queries: 12,
  };

  const stats = [
    {
      title: "Products",
      value: data.products,
      link: "/dashboard/products",
    },
    {
      title: "Orders",
      value: data.orders,
      link: "/dashboard/orders",
    },
    {
      title: "Users",
      value: data.users,
      link: "/dashboard/users",
    },
    {
      title: "Queries",
      value: data.queries,
      link: "/dashboard/queries",
    },
  ];

  const activities = [
    {
      text: "New order placed",
      time: "2 min ago",
      type: "order",
    },
    {
      text: "New user registered",
      time: "10 min ago",
      type: "user",
    },
    {
      text: "Catalogue updated",
      time: "1 hour ago",
      type: "update",
    },
  ];

  const typeColors = {
    order: "bg-green-500",
    user: "bg-blue-500",
    update: "bg-yellow-500",
  };

  return (
    <div className="space-y-10 font-lato">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">Dashboard Overview</h1>
        <p className="text-sm text-brand-muted mt-1">
          Monitor performance and activity
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            onClick={() => router.push(item.link)}
            className="group cursor-pointer bg-card border border-border rounded-xl p-6 hover:shadow-lg transition"
          >
            <p className="text-sm text-brand-muted">{item.title}</p>

            <div className="flex items-end justify-between mt-3">
              <h3 className="text-3xl font-semibold">{item.value}</h3>

              <span className="text-xs text-brand-muted group-hover:text-foreground">
                View →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <QuickCard
          title="Add Product"
          onClick={() => router.push("/dashboard/products")}
        />
        <QuickCard
          title="Add Category"
          onClick={() => router.push("/dashboard/categories")}
        />
        <QuickCard
          title="View Queries"
          onClick={() => router.push("/dashboard/queries")}
        />
        <QuickCard
          title="Manage Users"
          onClick={() => router.push("/dashboard/users")}
        />
      </div>

      {/* ACTIVITY */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex justify-between mb-5">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <span className="text-xs text-brand-muted">Live updates</span>
        </div>

        <ul className="space-y-4">
          {activities.map((item, i) => (
            <li key={i} className="flex items-center gap-3 text-sm">
              <span
                className={`h-2 w-2 rounded-full ${typeColors[item.type]}`}
              />
              <span className="flex-1 text-muted-foreground">{item.text}</span>
              <span className="text-xs text-brand-muted">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* QUICK ACTION CARD */
function QuickCard({ title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer border border-border rounded-lg px-4 py-3 text-sm hover:bg-accent transition"
    >
      {title}
    </div>
  );
}
