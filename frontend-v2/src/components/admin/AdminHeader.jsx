"use client";

export default function AdminHeader({ user }) {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 font-[Lato]">
      
      {/* Title */}
      <h1 className="text-lg font-semibold tracking-tight text-foreground">
        Dashboard
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground/90">
          {user?.name || "Admin"}
        </span>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="text-sm font-medium px-4 py-1.5 rounded-md border border-border bg-background hover:bg-foreground hover:text-background transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </header>
  );
}