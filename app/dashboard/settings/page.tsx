"use client";

import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useUser } from "@/hooks/useUser";
import { User, Lock, Mail } from "lucide-react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  async function handleProfileUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Profile update logic would go here
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Profile updated successfully");
    setLoading(false);
  }

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-2xl space-y-6">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your account information</CardDescription>
          </CardHeader>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <Input
              name="name"
              label="Name"
              defaultValue={user?.name || ""}
              icon={<User size={18} />}
            />
            <Input
              name="email"
              label="Email"
              defaultValue={user?.email || ""}
              icon={<Mail size={18} />}
              disabled
            />
            <Button type="submit" loading={loading}>
              Save changes
            </Button>
          </form>
        </Card>

        {/* Password */}
        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your account password</CardDescription>
          </CardHeader>
          <form className="space-y-4">
            <Input
              name="currentPassword"
              type="password"
              label="Current password"
              placeholder="Enter current password"
              icon={<Lock size={18} />}
            />
            <Input
              name="newPassword"
              type="password"
              label="New password"
              placeholder="At least 8 characters"
              icon={<Lock size={18} />}
            />
            <Input
              name="confirmPassword"
              type="password"
              label="Confirm new password"
              placeholder="Repeat new password"
              icon={<Lock size={18} />}
            />
            <Button type="submit">Update password</Button>
          </form>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible actions for your account
            </CardDescription>
          </CardHeader>
          <Button variant="danger">Delete Account</Button>
        </Card>
      </div>
    </DashboardLayout>
  );
}
