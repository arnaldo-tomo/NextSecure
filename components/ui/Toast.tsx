"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "#fff",
          color: "#1e293b",
          border: "1px solid #e2e8f0",
          borderRadius: "12px",
          padding: "12px 16px",
          fontSize: "14px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
        },
        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
