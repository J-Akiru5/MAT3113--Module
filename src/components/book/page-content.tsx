"use client";

import type { Section, Unit } from "@/lib/types";
import { BlockRenderer } from "./block-renderer";

/**
 * The navy/violet full-bleed cover for each Unit — displayed inside BookPageShell.
 */
export function UnitCoverContent({ unit }: { unit: Unit }) {
  const unitNum = unit.order;
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-navy via-navy-mid to-navy text-white">
      {/* Large decorative unit number */}
      <span
        className="pointer-events-none absolute select-none font-display font-bold text-white/5"
        style={{ fontSize: "18rem", lineHeight: 1, bottom: "-2rem", right: "-1rem" }}
      >
        {unitNum}
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-4 px-8 text-center">
        {/* Small pill label */}
        <span className="rounded-full bg-violet/80 px-4 py-1 text-xs font-semibold uppercase tracking-widest">
          {unitNum === 0 ? "Course Orientation" : `Unit ${unitNum}`}
        </span>

        {/* Decorative line */}
        <div className="flex items-center gap-3 w-full justify-center">
          <div className="h-px flex-1 bg-white/20 max-w-16" />
          <span className="text-violet-300 text-xs">◆</span>
          <div className="h-px flex-1 bg-white/20 max-w-16" />
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
          {unit.title}
        </h2>

        {/* Subtitle / course tag */}
        <p className="text-xs font-medium uppercase tracking-widest text-white/50">
          MAT 3113 · Problem Solving, Mathematical Investigation &amp; Modeling
        </p>
      </div>
    </div>
  );
}

/**
 * A regular content page — section heading + blocks — displayed inside BookPageShell.
 */
export function SectionContent({
  section,
  unitTitle,
  unitOrder,
}: {
  section: Section;
  unitTitle: string;
  unitOrder: number;
}) {
  return (
    <div className="flex h-full flex-col">
      {/* Section breadcrumb */}
      <div className="mb-3 flex items-center gap-2 border-b border-border pb-3">
        <span className="rounded bg-violet/10 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-widest text-violet-strong">
          {unitOrder === 0 ? "Course Orientation" : `Unit ${unitOrder}`}
        </span>
        <span className="text-[0.6rem] text-gray/50">›</span>
        <span className="text-[0.6rem] font-medium text-gray">{unitTitle}</span>
      </div>

      {/* Section heading */}
      <h2 className="mb-3 font-display text-lg font-bold text-navy sm:text-xl">
        {section.heading}
      </h2>

      {/* Blocks */}
      <div className="flex-1 overflow-hidden">
        <div className="prose prose-sm prose-gray max-w-none [&_p]:text-[0.78rem] [&_li]:text-[0.78rem] [&_h3]:text-[0.9rem] [&_h4]:text-[0.8rem]">
          {section.blocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
        </div>
      </div>
    </div>
  );
}
