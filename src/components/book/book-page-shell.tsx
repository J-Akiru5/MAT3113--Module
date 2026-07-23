"use client";

import { cn } from "@/lib/utils";
import type React from "react";

interface BookPageShellProps {
  pageNumber: number;
  totalPages: number;
  children: React.ReactNode;
  className?: string;
  /** If true, render the full-bleed navy cover style */
  isCover?: boolean;
}

/**
 * Renders the ISUFST-styled page chrome that matches the reference image:
 *  - Top navy header bar with school branding + course name
 *  - Faint math-symbol watermarks in the background
 *  - Main content area (slot)
 *  - Bottom navy footer bar with campus info + page number
 */
export function BookPageShell({
  pageNumber,
  totalPages,
  children,
  className,
  isCover = false,
}: BookPageShellProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col overflow-hidden bg-white",
        "w-full",
        className,
      )}
      style={{ aspectRatio: "1 / 1.414" /* A4 ratio */ }}
    >
      {/* ── Math watermark symbols ─────────────────────────────── */}
      <MathWatermark />

      {/* ── Top header bar ─────────────────────────────────────── */}
      <header className="relative z-10 flex shrink-0 items-center justify-between bg-navy px-5 py-2.5">
        {/* Left: logo + school name */}
        <div className="flex items-center gap-2.5">
          <IsufstLogo />
          <div className="leading-tight">
            <p className="text-[0.45rem] font-bold uppercase tracking-widest text-white/70 sm:text-[0.5rem]">
              Iloilo State University of
            </p>
            <p className="text-[0.5rem] font-bold uppercase tracking-widest text-white sm:text-[0.55rem]">
              Fisheries Science and Technology
            </p>
            <p className="text-[0.45rem] font-semibold uppercase tracking-wider text-violet-300 sm:text-[0.5rem]">
              College of Education
            </p>
          </div>
        </div>
        {/* Right: course tag */}
        <div className="text-right">
          <p className="text-[0.42rem] font-semibold uppercase tracking-widest text-white/60 sm:text-[0.47rem]">
            Problem Solving,
          </p>
          <p className="text-[0.42rem] font-semibold uppercase tracking-widest text-white/60 sm:text-[0.47rem]">
            Mathematical Investigation
          </p>
          <p className="text-[0.42rem] font-semibold uppercase tracking-widest text-white/60 sm:text-[0.47rem]">
            and Modeling
          </p>
        </div>
      </header>

      {/* ── Content area ───────────────────────────────────────── */}
      <div className={cn("relative z-10 flex-1 overflow-hidden", isCover ? "" : "p-5 sm:p-7")}>
        {children}
      </div>

      {/* ── Bottom footer bar ──────────────────────────────────── */}
      <footer className="relative z-10 flex shrink-0 items-center justify-between bg-navy px-5 py-2">
        {/* Book icon + title */}
        <div className="flex items-center gap-2">
          <svg className="h-3 w-3 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-[0.4rem] text-white/60 sm:text-[0.45rem] leading-tight">
            Instructional Material in Problem Solving,<br />
            Mathematical Investigation and Modeling
          </p>
        </div>

        {/* Campus info */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <svg className="h-2.5 w-2.5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-[0.38rem] text-white/50 sm:text-[0.43rem] leading-tight">
              ISUFST Dingle Campus<br />
              Dingle, Iloilo 5002
            </p>
          </div>
          <div className="flex items-center gap-1">
            <svg className="h-2.5 w-2.5 text-white/60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
            </svg>
            <p className="text-[0.38rem] text-white/50 sm:text-[0.43rem] leading-tight">
              www.isufst.edu.ph<br />
              info@isufst.edu.ph
            </p>
          </div>
        </div>

        {/* Page number */}
        <div className="flex flex-col items-center justify-center rounded border border-white/20 px-2 py-1">
          <p className="text-[0.35rem] font-semibold uppercase tracking-widest text-white/50 sm:text-[0.4rem]">
            Page
          </p>
          <p className="font-display text-sm font-bold text-white sm:text-base">
            {String(pageNumber).padStart(2, "0")}
          </p>
        </div>
      </footer>
    </div>
  );
}

/** Faint math symbols scattered as a background watermark */
function MathWatermark() {
  const symbols = ["π", "Σ", "∫", "√", "Δ", "f(x)", "∞", "θ", "λ", "∂", "≈", "∈"];
  const positions = [
    { top: "5%", right: "3%", size: "4rem", opacity: 0.04, rotate: 15 },
    { top: "15%", left: "2%", size: "3rem", opacity: 0.03, rotate: -10 },
    { top: "40%", right: "2%", size: "5rem", opacity: 0.04, rotate: 5 },
    { top: "60%", left: "1%", size: "3.5rem", opacity: 0.03, rotate: 20 },
    { bottom: "20%", right: "5%", size: "4.5rem", opacity: 0.035, rotate: -15 },
    { bottom: "35%", left: "3%", size: "2.5rem", opacity: 0.03, rotate: 8 },
    { top: "25%", right: "10%", size: "2rem", opacity: 0.025, rotate: -5 },
    { top: "70%", right: "8%", size: "3rem", opacity: 0.03, rotate: 12 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
      {positions.map((pos, i) => (
        <span
          key={i}
          className="absolute font-display font-bold text-violet"
          style={{
            top: pos.top,
            bottom: (pos as { bottom?: string }).bottom,
            left: pos.left,
            right: pos.right,
            fontSize: pos.size,
            opacity: pos.opacity,
            transform: `rotate(${pos.rotate}deg)`,
            lineHeight: 1,
          }}
        >
          {symbols[i % symbols.length]}
        </span>
      ))}
    </div>
  );
}

/** Minimal ISUFST fish logo placeholder */
function IsufstLogo() {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
      <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C7 2 2 7 2 12s5 10 10 10 10-5 10-10S17 2 12 2zm-2 14.5v-9l7 4.5-7 4.5z" />
      </svg>
    </div>
  );
}
