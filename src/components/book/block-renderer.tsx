import { AlertTriangle, Info, Lightbulb, Star } from "lucide-react";
import type { Block, CalloutBlock as CalloutBlockType } from "@/lib/types";
import { cn } from "@/lib/utils";

const calloutIcons: Record<CalloutBlockType["style"], React.ReactNode> = {
  objective: <Lightbulb className="h-5 w-5" />,
  reminder: <AlertTriangle className="h-5 w-5" />,
  note: <Info className="h-5 w-5" />,
  "key-point": <Star className="h-5 w-5" />,
};

const calloutColors: Record<CalloutBlockType["style"], string> = {
  objective: "border-l-violet bg-violet-wash text-violet-strong",
  reminder: "border-l-amber-500 bg-amber-50 text-amber-800",
  note: "border-l-blue-500 bg-blue-50 text-blue-800",
  "key-point": "border-l-emerald-500 bg-emerald-50 text-emerald-800",
};

function RichTextBlock({ block }: { block: Extract<Block, { type: "richtext" }> }) {
  return (
    <div
      className="prose prose-gray max-w-none text-ink"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: content is author-controlled JSON
      dangerouslySetInnerHTML={{ __html: block.html }}
    />
  );
}

function TableBlock({ block }: { block: Extract<Block, { type: "table" }> }) {
  return (
    <div className="my-4 overflow-x-auto">
      {block.caption && <p className="mb-2 text-sm font-semibold text-navy">{block.caption}</p>}
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {block.columns.map((col, i) => (
              <th
                // biome-ignore lint/suspicious/noArrayIndexKey: static column headers
                key={i}
                className="border border-border bg-navy px-3 py-2 text-left text-xs font-semibold text-white"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: table rows are static
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-zinc-50"}>
              {row.map((cell, ci) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: table cells are static
                <td key={ci} className="border border-border px-3 py-2">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ImageBlock({ block }: { block: Extract<Block, { type: "image" }> }) {
  return (
    <figure className="my-6 text-center">
      {/* biome-ignore lint/performance/noImgElement: dynamic images from content */}
      <img
        src={`/images/${block.assetId}.png`}
        alt={block.alt}
        width={block.width ?? 600}
        height={block.height ?? 400}
        className="mx-auto rounded-lg border border-border"
        loading="lazy"
      />
      {block.caption && <figcaption className="mt-2 text-sm text-gray">{block.caption}</figcaption>}
    </figure>
  );
}

function CalloutBlock({ block }: { block: Extract<Block, { type: "callout" }> }) {
  const icon = calloutIcons[block.style];
  const colorClass = calloutColors[block.style];

  return (
    <div className={cn("my-5 rounded-lg border-l-4 p-4", colorClass)}>
      {(block.title || icon) && (
        <div className="mb-2 flex items-center gap-2">
          <span className="shrink-0">{icon}</span>
          {block.title && <strong className="text-sm">{block.title}</strong>}
        </div>
      )}
      {block.html ? (
        <div
          className="prose prose-sm max-w-none"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: content is author-controlled JSON
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      ) : null}
      {block.items && block.items.length > 0 && (
        <ul className="ml-5 list-disc space-y-1 text-sm">
          {block.items.map((item, i) => (
            <li
              // biome-ignore lint/suspicious/noArrayIndexKey: static items
              key={i}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: content is author-controlled JSON
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function QuizBlock({ block }: { block: Extract<Block, { type: "quiz" }> }) {
  return (
    <div className="my-6 rounded-lg border border-violet/30 bg-violet-wash p-5">
      {block.title && (
        <h3 className="mb-4 font-display text-lg font-bold text-navy">{block.title}</h3>
      )}
      <ol className="space-y-4">
        {block.questions.map((q, i) => (
          <li key={q.id} className="text-sm">
            <p className="font-medium text-ink">
              {i + 1}. {q.text}
            </p>
            {q.type === "multiple-choice" && q.options && (
              <div className="mt-2 ml-5 space-y-1">
                {q.options.map((opt, oi) => (
                  <label
                    // biome-ignore lint/suspicious/noArrayIndexKey: static options
                    key={oi}
                    className="flex items-center gap-2 text-gray cursor-pointer hover:text-ink"
                  >
                    <input type="radio" name={`${q.id}`} className="h-3.5 w-3.5 accent-violet" />
                    {opt}
                  </label>
                ))}
              </div>
            )}
            {q.type === "true-false" && (
              <div className="mt-2 ml-5 flex gap-4">
                <label className="flex items-center gap-2 text-sm text-gray cursor-pointer hover:text-ink">
                  <input type="radio" name={`${q.id}`} className="h-3.5 w-3.5 accent-violet" />
                  True
                </label>
                <label className="flex items-center gap-2 text-sm text-gray cursor-pointer hover:text-ink">
                  <input type="radio" name={`${q.id}`} className="h-3.5 w-3.5 accent-violet" />
                  False
                </label>
              </div>
            )}
            {q.type === "short-answer" && (
              <textarea
                className="mt-2 ml-5 w-full max-w-md rounded-lg border border-border px-3 py-2 text-sm text-ink placeholder:text-gray/50 focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20"
                rows={2}
                placeholder="Type your answer..."
              />
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function RubricBlock({ block }: { block: Extract<Block, { type: "rubric" }> }) {
  return (
    <div className="my-4 overflow-x-auto">
      {block.title && <p className="mb-2 text-sm font-semibold text-navy">{block.title}</p>}
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr>
            <th className="border border-border bg-navy px-3 py-2 text-left font-semibold text-white">
              Criteria
            </th>
            {block.columns.map((col, i) => (
              <th
                // biome-ignore lint/suspicious/noArrayIndexKey: static column headers
                key={i}
                className="border border-border bg-navy px-3 py-2 text-center font-semibold text-white"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row, ri) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static rows
            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-zinc-50"}>
              <td className="border border-border px-3 py-2 font-medium">{row.criteria}</td>
              {row.ratings.map((rating, ci) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: static cells
                <td key={ci} className="border border-border px-3 py-2 text-center">
                  {rating}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "richtext":
      return <RichTextBlock block={block} />;
    case "table":
      return <TableBlock block={block} />;
    case "image":
      return <ImageBlock block={block} />;
    case "callout":
      return <CalloutBlock block={block} />;
    case "quiz":
      return <QuizBlock block={block} />;
    case "rubric":
      return <RubricBlock block={block} />;
    default:
      return null;
  }
}
