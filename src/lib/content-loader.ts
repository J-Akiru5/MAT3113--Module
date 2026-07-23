import fs from "node:fs";
import path from "node:path";
import type { AboutAuthor, Appendix, BookContent, Reference, Unit } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function loadToc(): string[] {
  const tocPath = path.join(CONTENT_DIR, "toc.json");
  const raw = fs.readFileSync(tocPath, "utf-8");
  const data = JSON.parse(raw);
  return data.order as string[];
}

export function loadUnit(id: string): Unit {
  const unitPath = path.join(CONTENT_DIR, "units", `${id}.json`);
  const raw = fs.readFileSync(unitPath, "utf-8");
  return JSON.parse(raw) as Unit;
}

export function loadAllUnits(): Unit[] {
  const toc = loadToc();
  return toc.filter((id) => id.startsWith("unit-")).map((id) => loadUnit(id));
}

export function loadAppendix(id: string): Appendix | null {
  const appendixPath = path.join(CONTENT_DIR, "appendices", `${id}.json`);
  if (!fs.existsSync(appendixPath)) return null;
  const raw = fs.readFileSync(appendixPath, "utf-8");
  return JSON.parse(raw) as Appendix;
}

export function loadReferences(): Reference[] {
  const refPath = path.join(CONTENT_DIR, "meta", "references.json");
  if (!fs.existsSync(refPath)) return [];
  const raw = fs.readFileSync(refPath, "utf-8");
  return JSON.parse(raw) as Reference[];
}

export function loadAboutAuthor(): AboutAuthor | null {
  const authorPath = path.join(CONTENT_DIR, "meta", "about-author.json");
  if (!fs.existsSync(authorPath)) return null;
  const raw = fs.readFileSync(authorPath, "utf-8");
  return JSON.parse(raw) as AboutAuthor;
}

export function loadBookContent(): BookContent {
  const tocOrder = loadToc();
  const units: Record<string, Unit> = {};
  const appendices: Record<string, Appendix> = {};

  for (const id of tocOrder) {
    if (id.startsWith("unit-")) {
      units[id] = loadUnit(id);
    } else if (id.startsWith("appendix-")) {
      const appendix = loadAppendix(id);
      if (appendix) appendices[id] = appendix;
    }
  }

  return {
    tocOrder,
    units,
    appendices,
    meta: {
      references: loadReferences(),
      aboutAuthor: loadAboutAuthor() ?? {
        name: "Dr. Irene D. Suganob",
        title: "Faculty",
        department: "College of Education",
        institution: "ISUFST Dingle Campus",
        bio: "",
      },
    },
  };
}
