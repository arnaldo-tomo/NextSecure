"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { LoginInput, RegisterInput, ForgotPasswordInput } from "@/lib/validations";

export function useAuth() {
  const router = useRouter();

  async function login(data: LoginInput) {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error);
        return { success: false, error: result.error };
      }

      toast.success("Welcome back!");
      router.push("/dashboard");
      return { success: true };
    } catch (error) {
      toast.error("Something went wrong");
      return { success: false, error: "Something went wrong" };
    }
  }

  async function register(data: RegisterInput) {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.message || "Registration failed");
        return { success: false, error: json.message };
      }

      toast.success("Account created! Check your email to verify.");
      router.push("/auth/login");
      return { success: true };
    } catch (error) {
      toast.error("Something went wrong");
      return { success: false, error: "Something went wrong" };
    }
  }

  async function forgotPassword(data: ForgotPasswordInput) {
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.message || "Failed to send reset email");
        return { success: false, error: json.message };
      }

      toast.success("Password reset link sent to your email");
      return { success: true };
    } catch (error) {
      toast.error("Something went wrong");
      return { success: false, error: "Something went wrong" };
    }
  }

  async function resetPassword(token: string, password: string) {
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const json = await res.json();

      if (!res.ok) {
        toast.error(json.message || "Failed to reset password");
        return { success: false, error: json.message };
      }

      toast.success("Password reset successfully!");
      router.push("/auth/login");
      return { success: true };
    } catch (error) {
      toast.error("Something went wrong");
      return { success: false, error: "Something went wrong" };
    }
  }

  async function logout() {
    await signOut({ callbackUrl: "/auth/login" });
  }

  return { login, register, forgotPassword, resetPassword, logout };
}
