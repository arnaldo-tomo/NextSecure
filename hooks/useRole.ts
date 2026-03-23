"use client";

import { useUser } from "./useUser";

export function useRole() {
  const { user, isLoading } = useUser();

  return {
    role: user?.role || null,
    isAdmin: user?.role === "admin",
    isUser: user?.role === "user",
    isLoading,
    hasRole: (role: string) => user?.role === role,
  };
}
