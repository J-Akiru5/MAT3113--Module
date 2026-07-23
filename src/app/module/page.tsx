import { ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

export default function ModulePage() {
  return (
    <div className="py-16 sm:py-20">
      <div className="container-book">
        <div className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet">
            MAT 3113
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">
            View Module
          </h1>
          <p className="mt-3 text-gray">
            Browse the complete instructional module in flipbook or scroll mode.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Link
            href="/module/flipbook"
            className="group card flex items-center gap-4 transition-colors hover:border-violet hover:bg-violet-wash"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
              <BookOpen className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-bold text-navy group-hover:text-violet-strong">
                Flipbook Mode
              </h2>
              <p className="text-sm text-gray">
                Page-by-page reading with A4 layout, thumbnails, and page navigation.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-violet opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>

          <Link
            href="/module/scroll"
            className="group card flex items-center gap-4 transition-colors hover:border-violet hover:bg-violet-wash"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-navy text-white">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-bold text-navy group-hover:text-violet-strong">
                Scroll Mode
              </h2>
              <p className="text-sm text-gray">
                Continuous reading with sticky table of contents — best for mobile and quick
                reference.
              </p>
            </div>
            <ArrowRight className="h-5 w-5 shrink-0 text-violet opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </div>
  );
}
