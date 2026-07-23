import { BookOpen, Download, GraduationCap, ScrollText } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-br from-navy-deep via-navy to-navy-mid py-20 text-white sm:py-28">
        <div className="container-book">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-[.2em] text-violet-soft">
              ISUFST &middot; College of Education &middot; Dingle Campus
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Problem Solving, Mathematical Investigation &amp; Modeling
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-navy-mid/60">
              An interactive instructional module for BSEd Mathematics students, authored by Dr.
              Irene D. Suganob.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/module"
                className="inline-flex items-center gap-2 rounded-lg bg-violet px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet/30 transition-all hover:bg-violet-strong hover:shadow-xl"
              >
                <BookOpen className="h-4 w-4" />
                Read the Module
              </Link>
              <Link
                href="/downloads/module-latest.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </Link>
              <Link
                href="/syllabus"
                className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <ScrollText className="h-4 w-4" />
                View Syllabus
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-book">
          <div className="grid gap-8 sm:grid-cols-3">
            <FeatureCard
              icon={<BookOpen className="h-6 w-6" />}
              title="Read Online"
              description="Browse the module in flipbook or scroll mode — switch anytime. Mobile-friendly and accessible."
            />
            <FeatureCard
              icon={<Download className="h-6 w-6" />}
              title="Download PDF"
              description="Export the complete module as a print-ready PDF matching the A4 page layout."
            />
            <FeatureCard
              icon={<GraduationCap className="h-6 w-6" />}
              title="For Educators"
              description="Designed for BSEd Mathematics instruction. Includes rubrics, worksheets, quizzes, and guided investigations."
            />
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-violet-wash py-16 sm:py-20">
        <div className="container-book text-center">
          <h2 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            About the Author
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-gray">
            Dr. Irene D. Suganob is a faculty member of the College of Education at ISUFST Dingle
            Campus. This module reflects her commitment to developing future mathematics educators
            through structured, inquiry-based learning materials.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 rounded-lg border border-violet/30 px-5 py-2.5 text-sm font-medium text-violet-strong transition-colors hover:bg-violet-soft"
          >
            Learn more about the author
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="card text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-soft text-violet">
        {icon}
      </div>
      <h3 className="font-display text-lg font-bold text-navy">{title}</h3>
      <p className="mt-2 text-sm text-gray">{description}</p>
    </div>
  );
}
