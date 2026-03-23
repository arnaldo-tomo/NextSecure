"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Settings,
  Shield,
  Bell,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useRole } from "@/hooks/useRole";

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
  extraLinks?: { href: string; label: string; icon: React.ReactNode }[];
}

const defaultLinks = [
  { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
  { href: "/dashboard/notifications", label: "Notifications", icon: <Bell size={20} /> },
  { href: "/dashboard/settings", label: "Settings", icon: <Settings size={20} /> },
];

const adminLinks = [
  { href: "/dashboard/admin", label: "Admin Panel", icon: <Shield size={20} /> },
  { href: "/dashboard/admin/users", label: "Users", icon: <Users size={20} /> },
];

export function Sidebar({ collapsed = false, onToggle, extraLinks = [] }: SidebarProps) {
  const pathname = usePathname();
  const { isAdmin } = useRole();

  const allLinks = [
    ...defaultLinks,
    ...extraLinks,
    ...(isAdmin ? adminLinks : []),
  ];

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-white border-r border-slate-200 transition-all duration-300 flex flex-col",
        collapsed ? "w-[68px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-600 flex items-center justify-center flex-shrink-0">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <span className="text-lg font-bold text-slate-900">TomoAuth</span>
          </Link>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {allLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              )}
              title={collapsed ? link.label : undefined}
            >
              <span className="flex-shrink-0">{link.icon}</span>
              {!collapsed && <span>{link.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={() => signOut({ callbackUrl: "/auth/login" })}
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full"
          )}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
