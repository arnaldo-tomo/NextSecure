"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Bell, CheckCircle, Info, AlertTriangle } from "lucide-react";

const demoNotifications = [
  {
    id: "1",
    title: "Welcome to NextSecure!",
    message: "Your account has been created successfully. Start exploring your dashboard.",
    type: "success",
    read: false,
    createdAt: "2 minutes ago",
  },
  {
    id: "2",
    title: "Security Update",
    message: "We've updated our security protocols. Your data is safe.",
    type: "info",
    read: false,
    createdAt: "1 hour ago",
  },
  {
    id: "3",
    title: "Password Changed",
    message: "Your password was changed successfully. If this wasn't you, contact support.",
    type: "warning",
    read: true,
    createdAt: "2 days ago",
  },
];

const typeIcons = {
  success: <CheckCircle size={18} className="text-green-500" />,
  info: <Info size={18} className="text-blue-500" />,
  warning: <AlertTriangle size={18} className="text-amber-500" />,
  error: <AlertTriangle size={18} className="text-red-500" />,
};

export default function NotificationsPage() {
  return (
    <DashboardLayout title="Notifications">
      <div className="max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Notifications</h2>
            <p className="text-sm text-slate-500">Stay updated with your account activity</p>
          </div>
          <Button variant="outline" size="sm">
            Mark all as read
          </Button>
        </div>

        <div className="space-y-3">
          {demoNotifications.map((n) => (
            <Card
              key={n.id}
              className={n.read ? "opacity-60" : ""}
              hover
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {typeIcons[n.type as keyof typeof typeIcons]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-slate-900">{n.title}</p>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-brand-500" />}
                  </div>
                  <p className="text-sm text-slate-500 mt-0.5">{n.message}</p>
                  <p className="text-xs text-slate-400 mt-1.5">{n.createdAt}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {demoNotifications.length === 0 && (
          <Card className="text-center py-12">
            <Bell className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">No notifications yet</p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
