import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

// Replace with real auth
async function getUser() {
  return {
    name: "Test User",
    role: "admin",
  };
}

export default async function AdminLayout({ children }) {
  const user = await getUser();

  if (!user || user.role !== "admin") {
    redirect("/login");
  }

  return (
    <div className="h-screen flex bg-background text-foreground overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-64 border-r border-border bg-card">
        <AdminSidebar />
      </aside>

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <header className="h-16 border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <AdminHeader user={user} />
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="p-6 md:p-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}