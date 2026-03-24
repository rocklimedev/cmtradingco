export default function DashboardPage() {
  return (
    <div className="space-y-8 font-[Lato]">
      
      {/* Heading */}
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        Dashboard Overview
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Total Products", value: "120" },
          { title: "Orders", value: "80" },
          { title: "Customers", value: "45" },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-card p-6 rounded-lg border border-border transition-all duration-200 hover:shadow-md"
          >
            <p className="text-sm text-muted-foreground/90">
              {item.title}
            </p>

            <h3 className="text-2xl font-semibold text-foreground mt-2">
              {item.value}
            </h3>
          </div>
        ))}
      </div>

      {/* Activity */}
      <div className="bg-card p-6 rounded-lg border border-border transition-all duration-200 hover:shadow-md">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Recent Activity
        </h3>

        <ul className="space-y-2 text-sm text-muted-foreground/90">
          <li>New order placed</li>
          <li>Product added</li>
          <li>User registered</li>
        </ul>
      </div>
    </div>
  );
}