"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/ui/Avatar";
import { useRole } from "@/hooks/useRole";
import { Shield, Users, Activity } from "lucide-react";

const demoUsers = [
  { id: "1", name: "Admin User", email: "admin@nextsecure.dev", role: "admin", status: "active" },
  { id: "2", name: "John Doe", email: "john@example.com", role: "user", status: "active" },
  { id: "3", name: "Jane Smith", email: "jane@example.com", role: "user", status: "pending" },
];

export default function AdminPage() {
  const { isAdmin } = useRole();

  if (!isAdmin) {
    return (
      <DashboardLayout title="Access Denied">
        <Card className="text-center py-16">
          <Shield className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Access Denied</h2>
          <p className="text-slate-500">You need admin privileges to view this page.</p>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Admin Panel">
      {/* Admin Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
              <Users size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">3</p>
              <p className="text-sm text-slate-500">Total Users</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-green-50 text-green-600">
              <Activity size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">2</p>
              <p className="text-sm text-slate-500">Active Users</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
              <Shield size={20} />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">1</p>
              <p className="text-sm text-slate-500">Admins</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>Manage all registered users</CardDescription>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider pb-3">User</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider pb-3">Role</th>
                <th className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {demoUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.name} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-slate-900">{u.name}</p>
                        <p className="text-xs text-slate-500">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge variant={u.role === "admin" ? "danger" : "info"}>{u.role}</Badge>
                  </td>
                  <td className="py-3">
                    <Badge variant={u.status === "active" ? "success" : "warning"}>
                      {u.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
}
