import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

/* 🔐 Replace with real auth (cookies / JWT / DB) */
async function getUser() {
  // Example: fetch from API / cookies
  return {
    name: "Test User",
    role: "admin", // change to "user" to test redirect
  };
}

export default async function AdminLayout({ children }) {
  const user = await getUser();

  /* 🚫 AUTH GUARD */
  if (!user) {
    redirect("/login");
  }

  /* 🚫 ROLE GUARD */
  if (user.role !== "admin") {
    redirect("/"); // or show 403 page
  }

  return (
    <div className="h-screen flex bg-background text-foreground overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 shrink-0 border-r border-border bg-card hidden md:block">
        <AdminSidebar />
      </aside>

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* HEADER */}
        <header className="h-16 shrink-0 border-b border-border bg-background/80 backdrop-blur">
          <AdminHeader user={user} />
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
