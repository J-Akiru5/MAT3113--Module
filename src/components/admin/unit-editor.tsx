"use client";

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Block, Section, Unit } from "@/lib/types";

interface Props {
  unit: Unit;
}

export function UnitEditor({ unit: initialUnit }: Props) {
  const router = useRouter();
  const [unit, setUnit] = useState<Unit>(initialUnit);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggleExpand(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function updateSection(sectionId: string, updates: Partial<Section>) {
    setUnit((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === sectionId ? { ...s, ...updates } : s)),
    }));
  }

  function updateBlock(sectionId: string, blockId: string, updates: Partial<Block>) {
    setUnit((prev) => ({
      ...prev,
      sections: prev.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              blocks: s.blocks.map((b) => (b.id === blockId ? ({ ...b, ...updates } as Block) : b)),
            }
          : s,
      ),
    }));
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);

    try {
      const res = await fetch("/api/admin/save-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unitId: unit.id, data: unit }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {
      alert("Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="py-10">
      <div className="container-book">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-border p-2 text-navy hover:bg-violet-soft"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div>
              <h1 className="font-display text-2xl font-bold text-navy">Editing: {unit.title}</h1>
              <p className="text-sm text-gray">
                {unit.sections.length} section{unit.sections.length !== 1 ? "s" : ""},{" "}
                {unit.sections.reduce((a, s) => a + s.blocks.length, 0)} blocks
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-violet px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet/20 transition-all hover:bg-violet-strong disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>

        <div className="space-y-4">
          {unit.sections.map((section) => (
            <div key={section.id} className="rounded-lg border border-border bg-white">
              <button
                type="button"
                onClick={() => toggleExpand(section.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-zinc-50"
              >
                <GripVertical className="h-4 w-4 shrink-0 text-gray" />
                <span className="flex-1 text-sm font-medium text-navy">{section.heading}</span>
                <span className="text-xs text-gray">
                  {section.blocks.length} block{section.blocks.length !== 1 ? "s" : ""}
                </span>
                {expanded[section.id] ? (
                  <ChevronDown className="h-4 w-4 text-gray" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray" />
                )}
              </button>

              {expanded[section.id] && (
                <div className="border-t border-border px-4 py-3">
                  <div className="mb-3">
                    <label htmlFor={`heading-${section.id}`} className="block text-xs font-semibold text-gray mb-1">
                      Section Heading
                    </label>
                    <input
                      id={`heading-${section.id}`}
                      type="text"
                      value={section.heading}
                      onChange={(e) => updateSection(section.id, { heading: e.target.value })}
                      className="w-full rounded-lg border border-border px-3 py-2 text-sm text-ink focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20"
                    />
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-gray">Blocks</h4>
                    {section.blocks.map((block) => (
                      <div key={block.id} className="rounded-lg border border-border p-3">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-xs font-medium text-violet">{block.type}</span>
                          <button
                            type="button"
                            className="rounded p-1 text-gray hover:text-red-500"
                            aria-label="Delete block"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        {block.type === "richtext" && (
                          <textarea
                            value={block.html}
                            onChange={(e) =>
                              updateBlock(section.id, block.id, {
                                type: "richtext",
                                html: e.target.value,
                              })
                            }
                            rows={3}
                            className="w-full rounded-lg border border-border px-3 py-2 text-sm text-ink font-mono focus:border-violet focus:outline-none focus:ring-2 focus:ring-violet/20"
                          />
                        )}

                        {block.type === "table" && (
                          <div className="text-xs text-gray">
                            Table: {block.columns.length} columns &times; {block.rows.length} rows
                          </div>
                        )}

                        {block.type === "image" && (
                          <div className="text-xs text-gray">Image: {block.assetId}</div>
                        )}

                        {block.type === "callout" && (
                          <div className="text-xs text-gray">
                            Callout ({block.style}){block.title && ` — ${block.title}`}
                          </div>
                        )}

                        {block.type === "quiz" && (
                          <div className="text-xs text-gray">
                            Quiz: {block.questions.length} question
                            {block.questions.length !== 1 ? "s" : ""}
                          </div>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-border py-2 text-xs font-medium text-gray transition-colors hover:border-violet hover:text-violet"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add Block
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            className="flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-navy transition-colors hover:bg-violet-soft"
          >
            <Plus className="h-4 w-4" />
            Add Section
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-violet px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet/20 transition-all hover:bg-violet-strong disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
