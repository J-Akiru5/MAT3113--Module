"use client";

import { BookOpen, LogIn, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/module", label: "View Module" },
  { href: "/syllabus", label: "Syllabus" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-navy-deep text-white shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <BookOpen className="h-7 w-7 text-violet-soft" />
          <div className="hidden sm:block">
            <div className="text-xs font-semibold uppercase tracking-widest text-violet-soft/80">
              ISUFST &middot; College of Education
            </div>
            <div className="text-sm font-bold leading-tight text-white">MAT 3113 Module</div>
          </div>
          <div className="sm:hidden text-sm font-bold text-white">MAT 3113</div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-white/15 text-white"
                  : "text-white/75 hover:bg-white/10 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin/login"
            className="ml-3 flex items-center gap-1.5 rounded-lg border border-violet-soft/30 px-4 py-2 text-sm font-medium text-violet-soft transition-colors hover:bg-violet-soft/10"
          >
            <LogIn className="h-4 w-4" />
            Admin
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-white hover:bg-white/10 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/10 px-4 pb-4 pt-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-white/15 text-white"
                  : "text-white/75 hover:bg-white/10 hover:text-white",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin/login"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex items-center gap-1.5 rounded-lg border border-violet-soft/30 px-3 py-2.5 text-sm font-medium text-violet-soft transition-colors hover:bg-violet-soft/10"
          >
            <LogIn className="h-4 w-4" />
            Admin
          </Link>
        </nav>
      )}
    </header>
  );
}
