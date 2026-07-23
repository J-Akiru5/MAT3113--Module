import type { Metadata } from "next";
import { BlockRenderer } from "@/components/book/block-renderer";
import { loadAllUnits } from "@/lib/content-loader";

export const metadata: Metadata = {
  title: "Scroll Mode",
};

export default function ScrollModePage() {
  const units = loadAllUnits();

  return (
    <div className="flex">
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 shrink-0 overflow-y-auto border-r border-border bg-white p-4 lg:block">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray">Contents</h3>
        <nav className="space-y-1">
          {units.map((unit) => (
            <div key={unit.id}>
              <a
                href={`#${unit.id}`}
                className="block rounded-lg px-3 py-1.5 text-sm font-medium text-navy transition-colors hover:bg-violet-soft"
              >
                {unit.title}
              </a>
              {unit.sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="ml-3 block rounded-lg px-3 py-1 text-xs text-gray transition-colors hover:bg-violet-wash hover:text-violet-strong"
                >
                  {section.heading}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      <main className="min-w-0 flex-1">
        <div className="container-book py-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet">
            Scroll Mode
          </span>
          <h1 className="mt-1 font-display text-3xl font-bold text-navy">Reading View</h1>

          <div className="mt-10 space-y-16">
            {units.map((unit) => (
              <section key={unit.id} id={unit.id}>
                <h2 className="mb-8 font-display text-2xl font-bold text-navy border-b-2 border-violet-soft pb-2">
                  {unit.title}
                </h2>

                <div className="space-y-12">
                  {unit.sections.map((section) => (
                    <section key={section.id} id={section.id}>
                      <h3 className="mb-5 font-display text-xl font-bold text-navy-deep">
                        {section.heading}
                      </h3>
                      <div className="space-y-5">
                        {section.blocks.map((block) => (
                          <BlockRenderer key={block.id} block={block} />
                        ))}
                      </div>
                    </section>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
