"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useUser } from "@/hooks/useUser";
import { useRole } from "@/hooks/useRole";
import { CardSkeleton } from "@/components/ui/Skeleton";
import { Users, Shield, Activity, TrendingUp } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,234",
    change: "+12%",
    icon: <Users size={20} />,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Active Sessions",
    value: "56",
    change: "+3%",
    icon: <Activity size={20} />,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Auth Events",
    value: "8,901",
    change: "+18%",
    icon: <Shield size={20} />,
    color: "bg-purple-50 text-purple-600",
  },
  {
    title: "Growth",
    value: "23%",
    change: "+5%",
    icon: <TrendingUp size={20} />,
    color: "bg-amber-50 text-amber-600",
  },
];

export default function DashboardPage() {
  const { user, isLoading } = useUser();
  const { isAdmin } = useRole();

  if (isLoading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Dashboard">
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h2>
        <p className="text-slate-500 mt-1">
          Here&apos;s what&apos;s happening with your application today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title} hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500">{stat.title}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-3 flex items-center gap-1.5">
              <Badge variant="success">{stat.change}</Badge>
              <span className="text-xs text-slate-500">vs last month</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Info Cards */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your profile details</CardDescription>
          </CardHeader>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-sm text-slate-500">Name</span>
              <span className="text-sm font-medium text-slate-900">{user?.name}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-sm text-slate-500">Email</span>
              <span className="text-sm font-medium text-slate-900">{user?.email}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-slate-500">Role</span>
              <Badge variant={isAdmin ? "danger" : "info"}>
                {user?.role}
              </Badge>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <div className="space-y-3">
            {[
              { label: "Edit Profile", desc: "Update your name and avatar" },
              { label: "Change Password", desc: "Update your account password" },
              { label: "Manage Notifications", desc: "Configure alert preferences" },
              ...(isAdmin
                ? [{ label: "Admin Panel", desc: "Manage users and roles" }]
                : []),
            ].map((action) => (
              <div
                key={action.label}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{action.label}</p>
                  <p className="text-xs text-slate-500">{action.desc}</p>
                </div>
                <svg
                  className="h-4 w-4 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
