"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  extraLinks?: { href: string; label: string; icon: React.ReactNode }[];
}

export function DashboardLayout({ children, title, extraLinks }: DashboardLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        extraLinks={extraLinks}
      />
      <Topbar sidebarCollapsed={collapsed} title={title} />
      <main
        className={cn(
          "pt-24 pb-8 px-6 transition-all duration-300",
          collapsed ? "ml-[68px]" : "ml-64"
        )}
      >
        {children}
      </main>
    </div>
  );
}
