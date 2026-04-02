"use client";

export default function AdminHeader({ user }) {
  return (
    <div className="h-16 flex items-center justify-between px-6 font-lato">

      {/* LEFT */}
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold tracking-tight">
          Dashboard
        </h1>
        <span className="text-xs text-brand-muted">
          Admin Panel
        </span>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">

        {/* USER */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center text-sm font-semibold">
            {user?.name?.charAt(0) || "A"}
          </div>

          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-medium">
              {user?.name || "Admin"}
            </span>
            <span className="text-xs text-brand-muted">
              Administrator
            </span>
          </div>
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
          className="px-3 py-1.5 text-xs rounded-md border border-border hover:bg-accent transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}