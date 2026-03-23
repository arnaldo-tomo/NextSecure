"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft } from "lucide-react";
import { AuthForm } from "@/components/form/AuthForm";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { forgotPasswordSchema } from "@/lib/validations";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = { email: formData.get("email") as string };

    const result = forgotPasswordSchema.safeParse(data);
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setLoading(true);
    const res = await forgotPassword(data);
    if (res.success) setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <AuthForm
        title="Check your email"
        subtitle="We've sent a password reset link to your email address"
      >
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <Mail className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-slate-600">
            Didn&apos;t receive the email? Check your spam folder or{" "}
            <button
              onClick={() => setSent(false)}
              className="text-brand-600 hover:text-brand-700 font-medium"
            >
              try again
            </button>
          </p>
          <Link href="/auth/login">
            <Button variant="outline" className="mt-4">
              <ArrowLeft size={16} />
              Back to login
            </Button>
          </Link>
        </div>
      </AuthForm>
    );
  }

  return (
    <AuthForm
      title="Forgot password?"
      subtitle="Enter your email and we'll send you a reset link"
      footer={
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-700 font-medium"
        >
          <ArrowLeft size={14} />
          Back to login
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="you@example.com"
          icon={<Mail size={18} />}
          error={error}
          autoComplete="email"
        />

        <Button type="submit" className="w-full" loading={loading}>
          Send reset link
        </Button>
      </form>
    </AuthForm>
  );
}
