"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/admin/check-auth");
        if (!res.ok) {
          router.push("/admin/login");
          return;
        }
      } catch {
        router.push("/admin/login");
        return;
      }
      setChecking(false);
    }
    checkAuth();
  }, [router]);

  if (checking) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="text-sm text-gray">Checking authentication...</div>
      </div>
    );
  }

  return <>{children}</>;
}
