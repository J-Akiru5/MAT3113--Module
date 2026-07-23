"use client";

import { BookPageShell } from "@/components/book/book-page-shell";
import { SectionContent, UnitCoverContent } from "@/components/book/page-content";
import { ThumbnailStrip, type PageMeta } from "@/components/book/thumbnail-strip";
import type { loadAllUnits } from "@/lib/content-loader";
import type { Section, Unit } from "@/lib/types";
import { ChevronLeft, ChevronRight, Maximize2, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────
type CoverPage = { kind: "cover"; unit: Unit; absoluteIndex: number };
type SectionPage = {
  kind: "section";
  unit: Unit;
  section: Section;
  absoluteIndex: number;
};
type Page = CoverPage | SectionPage;

// ── Build flat page list from units ────────────────────────────────
function buildPages(units: Awaited<ReturnType<typeof loadAllUnits>>): Page[] {
  const pages: Page[] = [];
  let idx = 0;
  for (const unit of units) {
    pages.push({ kind: "cover", unit, absoluteIndex: idx++ });
    for (const section of unit.sections) {
      pages.push({ kind: "section", unit, section, absoluteIndex: idx++ });
    }
  }
  return pages;
}

// ── Page thumbnail meta ─────────────────────────────────────────────
function buildPageMeta(pages: Page[]): PageMeta[] {
  return pages.map((p, i) => {
    if (p.kind === "cover") {
      return {
        index: i,
        label: p.unit.order === 0 ? "Cover" : `Unit ${p.unit.order}`,
        sublabel: p.unit.title,
      };
    }
    return {
      index: i,
      label: `Pg ${i + 1}`,
      sublabel: p.section.heading,
    };
  });
}

// ── Main component ─────────────────────────────────────────────────
export default function FlipbookPage() {
  const [units, setUnits] = useState<Awaited<ReturnType<typeof loadAllUnits>>>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [zoom, setZoom] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/content/units")
      .then((r) => r.json())
      .then(setUnits);
  }, []);

  const pages = useMemo(() => buildPages(units), [units]);
  const pageMeta = useMemo(() => buildPageMeta(pages), [pages]);
  const totalPages = Math.max(1, pages.length);

  const goTo = useCallback(
    (n: number) => setCurrentPage(Math.min(totalPages - 1, Math.max(0, n))),
    [totalPages],
  );

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(currentPage + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(currentPage - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentPage, goTo]);

  const page = pages[currentPage];
  // Absolute page number shown in footer (1-indexed)
  const displayPageNum = currentPage + 1;

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-zinc-200">
      {/* ── Top toolbar ──────────────────────────────────────────── */}
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-white px-4 py-2 shadow-sm">
        {/* Left: nav buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 0}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-navy transition hover:bg-violet-wash disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>

          <span className="min-w-[6rem] text-center text-sm font-medium text-navy">
            Page{" "}
            <span className="font-bold text-violet">{currentPage + 1}</span>{" "}
            / {totalPages}
          </span>

          <button
            type="button"
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm text-navy transition hover:bg-violet-wash disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Center: page indicator dots (max 7 shown) */}
        <div className="hidden items-center gap-1 sm:flex">
          {pageMeta.slice(Math.max(0, currentPage - 3), currentPage + 4).map((p) => (
            <button
              key={p.index}
              type="button"
              onClick={() => goTo(p.index)}
              className={`h-2 rounded-full transition-all ${
                p.index === currentPage
                  ? "w-6 bg-violet"
                  : "w-2 bg-zinc-300 hover:bg-violet/40"
              }`}
              title={p.sublabel ?? p.label}
            />
          ))}
        </div>

        {/* Right: zoom controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
            className="rounded-lg border border-border p-1.5 text-navy transition hover:bg-violet-wash"
            title="Zoom out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="w-12 text-center text-xs font-semibold text-gray">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
            className="rounded-lg border border-border p-1.5 text-navy transition hover:bg-violet-wash"
            title="Zoom in"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setZoom(1)}
            className="rounded-lg border border-border p-1.5 text-navy transition hover:bg-violet-wash"
            title="Fit to screen"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* ── Body: sidebar + canvas ────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">
        {/* Thumbnail sidebar */}
        <ThumbnailStrip
          pages={pageMeta}
          currentPage={currentPage}
          onPageSelect={goTo}
        />

        {/* Canvas / page viewer */}
        <div
          ref={containerRef}
          className="relative flex flex-1 items-center justify-center overflow-auto bg-zinc-300 p-8"
          style={{
            backgroundImage:
              "radial-gradient(circle, #c0c0c0 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        >
          {page ? (
            <div
              className="origin-center transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
            >
              <BookPageShell
                pageNumber={displayPageNum}
                totalPages={totalPages}
                isCover={page.kind === "cover"}
                className="w-[480px] shadow-2xl ring-1 ring-black/10 sm:w-[560px] md:w-[620px]"
              >
                {page.kind === "cover" ? (
                  <UnitCoverContent unit={page.unit} />
                ) : (
                  <SectionContent
                    section={page.section}
                    unitTitle={page.unit.title}
                    unitOrder={page.unit.order}
                  />
                )}
              </BookPageShell>
            </div>
          ) : (
            <div className="flex h-64 w-48 items-center justify-center rounded-xl bg-white shadow-xl">
              <p className="text-sm text-gray">Loading…</p>
            </div>
          )}

          {/* Click-zone overlays for prev/next */}
          <button
            type="button"
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur transition hover:bg-white hover:shadow-xl disabled:opacity-0"
          >
            <ChevronLeft className="h-5 w-5 text-navy" />
          </button>
          <button
            type="button"
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg backdrop-blur transition hover:bg-white hover:shadow-xl disabled:opacity-0"
          >
            <ChevronRight className="h-5 w-5 text-navy" />
          </button>
        </div>
      </div>
    </div>
  );
}
