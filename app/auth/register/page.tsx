"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User } from "lucide-react";
import { AuthForm } from "@/components/form/AuthForm";
import { SocialButtons } from "@/components/form/SocialButtons";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { registerSchema, type RegisterInput } from "@/lib/validations";

export default function RegisterPage() {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterInput, string>>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    const result = registerSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    await register(data);
    setLoading(false);
  }

  return (
    <AuthForm
      title="Create your account"
      subtitle="Start building with NextSecure today"
      footer={
        <span>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-brand-600 hover:text-brand-700 font-medium">
            Sign in
          </Link>
        </span>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          type="text"
          label="Full name"
          placeholder="John Doe"
          icon={<User size={18} />}
          error={errors.name}
          autoComplete="name"
        />

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
          placeholder="At least 8 characters"
          icon={<Lock size={18} />}
          error={errors.password}
          autoComplete="new-password"
        />

        <Input
          name="confirmPassword"
          type="password"
          label="Confirm password"
          placeholder="Repeat your password"
          icon={<Lock size={18} />}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <Button type="submit" className="w-full" loading={loading}>
          Create account
        </Button>
      </form>

      <SocialButtons />
    </AuthForm>
  );
}
