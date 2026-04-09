"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  FolderTree,
  MessageSquare,
  Users,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Brands & Catalogues",
    href: "/dashboard/brands-catalogues",
    icon: Layers,
  },
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: FolderTree,
  },
  {
    name: "Queries",
    href: "/dashboard/queries",
    icon: MessageSquare,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col font-lato">
      {/* HEADER */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-brand-red text-white flex items-center justify-center text-sm font-semibold">
            A
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Admin Panel
          </span>
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 p-4 space-y-1">
        <p className="px-3 text-xs text-brand-muted uppercase tracking-wide mb-2">
          Management
        </p>

        {menu.map((item) => {
          const active = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition ${
                active
                  ? "bg-brand-red text-white shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {/* ICON */}
              <Icon
                size={16}
                className={`${
                  active
                    ? "text-white"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              />

              {/* TEXT */}
              <span className="flex-1">{item.name}</span>

              {/* ACTIVE DOT */}
              {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
