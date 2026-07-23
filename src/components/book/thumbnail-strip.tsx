"use client";

import { cn } from "@/lib/utils";

export interface PageMeta {
  index: number;
  label: string;
  sublabel?: string;
}

interface ThumbnailStripProps {
  pages: PageMeta[];
  currentPage: number;
  onPageSelect: (index: number) => void;
}

export function ThumbnailStrip({ pages, currentPage, onPageSelect }: ThumbnailStripProps) {
  return (
    <aside className="flex h-full w-[140px] shrink-0 flex-col gap-2 overflow-y-auto border-r border-border bg-zinc-100 p-2">
      {pages.map((page) => (
        <button
          key={page.index}
          type="button"
          onClick={() => onPageSelect(page.index)}
          className={cn(
            "group flex flex-col overflow-hidden rounded-md border-2 transition-all",
            currentPage === page.index
              ? "border-violet shadow-md shadow-violet/20"
              : "border-transparent hover:border-violet/30",
          )}
        >
          {/* Mini page preview */}
          <div
            className={cn(
              "relative flex flex-col overflow-hidden bg-white",
              "w-full",
            )}
            style={{ aspectRatio: "1 / 1.414" }}
          >
            {/* Mini header bar */}
            <div className="h-[8%] w-full bg-navy" />
            {/* Mini content area */}
            <div className="flex flex-1 flex-col gap-0.5 p-1">
              <div
                className={cn(
                  "h-1 w-3/4 rounded-full",
                  currentPage === page.index ? "bg-navy" : "bg-zinc-300",
                )}
              />
              <div
                className={cn(
                  "h-0.5 w-1/2 rounded-full",
                  currentPage === page.index ? "bg-violet/50" : "bg-zinc-200",
                )}
              />
              <div className="mt-1 space-y-0.5">
                {[70, 90, 60, 80, 50].map((w, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-0.5 rounded-full",
                      currentPage === page.index ? "bg-zinc-400" : "bg-zinc-200",
                    )}
                    style={{ width: `${w}%` }}
                  />
                ))}
              </div>
            </div>
            {/* Mini footer bar */}
            <div className="h-[6%] w-full bg-navy" />
          </div>

          {/* Thumbnail label */}
          <div
            className={cn(
              "px-1.5 py-1 text-center",
              currentPage === page.index
                ? "bg-violet text-white"
                : "bg-zinc-100 text-gray group-hover:bg-violet/10",
            )}
          >
            <p className="truncate text-[0.55rem] font-semibold uppercase tracking-widest">
              {page.label}
            </p>
            {page.sublabel && (
              <p className="truncate text-[0.45rem] opacity-70">{page.sublabel}</p>
            )}
          </div>
        </button>
      ))}
    </aside>
  );
}
