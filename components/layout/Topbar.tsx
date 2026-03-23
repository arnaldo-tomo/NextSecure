"use client";

import React from "react";
import { Bell, Search } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";

interface TopbarProps {
  sidebarCollapsed?: boolean;
  title?: string;
}

export function Topbar({ sidebarCollapsed = false, title }: TopbarProps) {
  const { user } = useUser();

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 transition-all duration-300",
        sidebarCollapsed ? "left-[68px]" : "left-64"
      )}
    >
      {/* Left side */}
      <div className="flex items-center gap-4">
        {title && (
          <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
          <Search size={20} />
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
        </button>

        {/* User */}
        {user && (
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{user.name}</p>
              <p className="text-xs text-slate-500">{user.email}</p>
            </div>
            <Avatar src={user.image} name={user.name || "U"} size="md" />
          </div>
        )}
      </div>
    </header>
  );
}
