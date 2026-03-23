"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { AuthForm } from "@/components/form/AuthForm";
import { Button } from "@/components/ui/Button";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    token ? "loading" : "error"
  );

  useEffect(() => {
    if (!token) return;

    async function verify() {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        setStatus(res.ok ? "success" : "error");
      } catch {
        setStatus("error");
      }
    }

    verify();
  }, [token]);

  if (status === "loading") {
    return (
      <AuthForm title="Verifying your email" subtitle="Please wait...">
        <div className="flex justify-center py-8">
          <Loader2 className="h-10 w-10 text-brand-600 animate-spin" />
        </div>
      </AuthForm>
    );
  }

  if (status === "success") {
    return (
      <AuthForm title="Email verified!" subtitle="Your email has been verified successfully">
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-slate-600">
            You can now sign in to your account.
          </p>
          <Link href="/auth/login">
            <Button className="mt-2">Go to login</Button>
          </Link>
        </div>
      </AuthForm>
    );
  }

  return (
    <AuthForm
      title="Verification failed"
      subtitle="This verification link is invalid or has expired"
    >
      <div className="text-center space-y-4">
        <div className="mx-auto h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
          <XCircle className="h-8 w-8 text-red-600" />
        </div>
        <p className="text-sm text-slate-600">
          Please try registering again or contact support.
        </p>
        <Link href="/auth/register">
          <Button variant="outline" className="mt-2">Back to register</Button>
        </Link>
      </div>
    </AuthForm>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailContent />
    </Suspense>
  );
}
