"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import { AuthForm } from "@/components/form/AuthForm";
import { SocialButtons } from "@/components/form/SocialButtons";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, type LoginInput } from "@/lib/validations";

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginInput, string>>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = loginSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    await login(data);
    setLoading(false);
  }

  return (
    <AuthForm
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      footer={
        <span>
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-brand-600 hover:text-brand-700 font-medium">
            Sign up
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          icon={<Mail size={18} />}
          error={errors.email}
          autoComplete="email"
        />

        <Input
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          icon={<Lock size={18} />}
          error={errors.password}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="text-slate-600">Remember me</span>
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-sm text-brand-600 hover:text-brand-700 font-medium"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" loading={loading}>
          Sign in
        </Button>
      </form>

      <SocialButtons />
    </AuthForm>
  );
}
