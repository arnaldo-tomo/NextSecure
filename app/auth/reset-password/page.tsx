"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowLeft } from "lucide-react";
import { AuthForm } from "@/components/form/AuthForm";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { resetPasswordSchema } from "@/lib/validations";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!token) {
    return (
      <AuthForm title="Invalid link" subtitle="This password reset link is invalid or has expired">
        <div className="text-center">
          <Link href="/auth/forgot-password">
            <Button variant="outline">
              <ArrowLeft size={16} />
              Request new link
            </Button>
          </Link>
        </div>
      </AuthForm>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const result = resetPasswordSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    await resetPassword(token!, data.password);
    setLoading(false);
  }

  return (
    <AuthForm title="Reset password" subtitle="Enter your new password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="password"
          type="password"
          label="New password"
          placeholder="At least 8 characters"
          icon={<Lock size={18} />}
          error={errors.password}
          autoComplete="new-password"
        />

        <Input
          name="confirmPassword"
          type="password"
          label="Confirm new password"
          placeholder="Repeat your password"
          icon={<Lock size={18} />}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <Button type="submit" className="w-full" loading={loading}>
          Reset password
        </Button>
      </form>
    </AuthForm>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
