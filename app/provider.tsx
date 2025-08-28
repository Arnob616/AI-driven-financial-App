"use client";

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/lib/context/user-context";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UserProvider>
        {children}
        <Toaster />
      </UserProvider>
    </SessionProvider>
  );
}
