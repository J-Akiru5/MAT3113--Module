export interface BookContent {
  tocOrder: string[];
  units: Record<string, Unit>;
  appendices: Record<string, Appendix>;
  meta: {
    references: Reference[];
    aboutAuthor: AboutAuthor;
  };
}

export interface Unit {
  id: string;
  order: number;
  title: string;
  sections: Section[];
}

export interface Section {
  id: string;
  order: number;
  heading: string;
  blocks: Block[];
}

export type Block =
  | RichTextBlock
  | TableBlock
  | ImageBlock
  | CalloutBlock
  | QuizBlock
  | WorksheetBlock
  | RubricBlock;

export interface RichTextBlock {
  id: string;
  type: "richtext";
  html: string;
}

export interface TableBlock {
  id: string;
  type: "table";
  caption?: string;
  columns: string[];
  rows: string[][];
}

export interface ImageBlock {
  id: string;
  type: "image";
  assetId: string;
  caption?: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface CalloutBlock {
  id: string;
  type: "callout";
  style: "objective" | "reminder" | "note" | "key-point";
  title?: string;
  items?: string[];
  html?: string;
}

export interface QuizBlock {
  id: string;
  type: "quiz";
  refId: string;
  title?: string;
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  text: string;
  type: "multiple-choice" | "true-false" | "short-answer";
  options?: string[];
  answer?: string;
}

export interface WorksheetBlock {
  id: string;
  type: "worksheet";
  title: string;
  instructions: string;
  problems: WorksheetProblem[];
}

export interface WorksheetProblem {
  id: string;
  number: number;
  text: string;
  rubricRef?: string;
}

export interface RubricBlock {
  id: string;
  type: "rubric";
  title: string;
  columns: string[];
  rows: RubricRow[];
}

export interface RubricRow {
  criteria: string;
  ratings: string[];
}

export interface Appendix {
  id: string;
  order: number;
  title: string;
  label: string;
  blocks: Block[];
}

export interface Reference {
  id: string;
  text: string;
}

export interface AboutAuthor {
  name: string;
  title: string;
  department: string;
  institution: string;
  bio: string;
  photoAssetId?: string;
}

export interface TocItem {
  id: string;
  title: string;
  level: "unit" | "section";
  pageStart: number;
  children?: TocItem[];
}
