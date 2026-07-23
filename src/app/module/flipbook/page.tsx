"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BlockRenderer } from "@/components/book/block-renderer";
import type { loadAllUnits } from "@/lib/content-loader";

export default function FlipbookPage() {
  const [units, setUnits] = useState<Awaited<ReturnType<typeof loadAllUnits>>>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchContent() {
      const res = await fetch("/api/content/units");
      const data = await res.json();
      setUnits(data);
    }
    fetchContent();
  }, []);

  const totalPages = Math.max(
    1,
    units.reduce((acc, unit) => {
      return acc + unit.sections.length + 1;
    }, 0),
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-zinc-100">
      <div className="sticky top-16 z-40 flex items-center justify-between border-b border-border bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="rounded-lg border border-border p-2 text-navy transition-colors hover:bg-violet-soft disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-medium text-navy">
            Page {currentPage + 1} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage >= totalPages - 1}
            className="rounded-lg border border-border p-2 text-navy transition-colors hover:bg-violet-soft disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <span className="text-xs text-gray">Flipbook Mode</span>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div
          ref={contentRef}
          className="w-full max-w-[210mm] bg-white shadow-xl"
          style={{ minHeight: "277mm" }}
        >
          <div className="p-8" style={{ minHeight: "277mm" }}>
            <div className="prose prose-gray max-w-none">
              {units.map((unit) => (
                <div key={unit.id}>
                  <h2 className="font-display text-2xl font-bold text-navy mt-8 mb-6">
                    {unit.title}
                  </h2>
                  {unit.sections.map((section) => (
                    <div key={section.id} className="mb-8">
                      <h3 className="font-display text-xl font-bold text-navy-deep mb-4">
                        {section.heading}
                      </h3>
                      {section.blocks.map((block) => (
                        <BlockRenderer key={block.id} block={block} />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-white px-4 py-2 text-center">
        <p className="text-xs text-gray">
          Instructional Material in Problem Solving, Mathematical Investigation and Modeling
        </p>
      </div>
    </div>
  );
}
