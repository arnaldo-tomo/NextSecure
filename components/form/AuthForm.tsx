"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AuthFormProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthForm({
  children,
  title,
  subtitle,
  footer,
  className,
}: AuthFormProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-brand-50 px-4 py-12">
      <div className={cn("w-full max-w-md", className)}>
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="h-10 w-10 rounded-xl bg-brand-600 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-slate-900">
              {process.env.NEXT_PUBLIC_APP_NAME || "NextSecure"}
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            {subtitle && (
              <p className="text-slate-500 mt-2 text-sm">{subtitle}</p>
            )}
          </div>

          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="text-center mt-6 text-sm text-slate-500">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
