"use client";

import { useSession } from "next-auth/react";

export function useUser() {
  const { data: session, status } = useSession();

  return {
    user: session?.user
      ? {
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
          role: session.user.role,
        }
      : null,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
}
