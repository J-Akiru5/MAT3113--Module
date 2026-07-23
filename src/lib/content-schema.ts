import { z } from "zod/v4";

const richTextBlockSchema = z.object({
  id: z.string(),
  type: z.literal("richtext"),
  html: z.string(),
});

const tableBlockSchema = z.object({
  id: z.string(),
  type: z.literal("table"),
  caption: z.string().optional(),
  columns: z.array(z.string()),
  rows: z.array(z.array(z.string())),
});

const imageBlockSchema = z.object({
  id: z.string(),
  type: z.literal("image"),
  assetId: z.string(),
  caption: z.string().optional(),
  alt: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
});

const calloutBlockSchema = z.object({
  id: z.string(),
  type: z.literal("callout"),
  style: z.enum(["objective", "reminder", "note", "key-point"]),
  title: z.string().optional(),
  items: z.array(z.string()).optional(),
  html: z.string().optional(),
});

const quizQuestionSchema = z.object({
  id: z.string(),
  text: z.string(),
  type: z.enum(["multiple-choice", "true-false", "short-answer"]),
  options: z.array(z.string()).optional(),
  answer: z.string().optional(),
});

const quizBlockSchema = z.object({
  id: z.string(),
  type: z.literal("quiz"),
  refId: z.string(),
  title: z.string().optional(),
  questions: z.array(quizQuestionSchema),
});

const worksheetProblemSchema = z.object({
  id: z.string(),
  number: z.number(),
  text: z.string(),
  rubricRef: z.string().optional(),
});

const worksheetBlockSchema = z.object({
  id: z.string(),
  type: z.literal("worksheet"),
  title: z.string(),
  instructions: z.string(),
  problems: z.array(worksheetProblemSchema),
});

const rubricRowSchema = z.object({
  criteria: z.string(),
  ratings: z.array(z.string()),
});

const rubricBlockSchema = z.object({
  id: z.string(),
  type: z.literal("rubric"),
  title: z.string(),
  columns: z.array(z.string()),
  rows: z.array(rubricRowSchema),
});

export const blockSchema = z.discriminatedUnion("type", [
  richTextBlockSchema,
  tableBlockSchema,
  imageBlockSchema,
  calloutBlockSchema,
  quizBlockSchema,
  worksheetBlockSchema,
  rubricBlockSchema,
]);

export const sectionSchema = z.object({
  id: z.string(),
  order: z.number(),
  heading: z.string(),
  blocks: z.array(blockSchema),
});

export const unitSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  sections: z.array(sectionSchema),
});

export const appendixSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  label: z.string(),
  blocks: z.array(blockSchema),
});

export const referenceSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export const aboutAuthorSchema = z.object({
  name: z.string(),
  title: z.string(),
  department: z.string(),
  institution: z.string(),
  bio: z.string(),
  photoAssetId: z.string().optional(),
});

export const tocSchema = z.object({
  order: z.array(z.string()),
});

export const unitFileSchema = z.object({
  id: z.string(),
  order: z.number(),
  title: z.string(),
  sections: z.array(sectionSchema),
});

export type BlockSchema = z.infer<typeof blockSchema>;
export type SectionSchema = z.infer<typeof sectionSchema>;
export type UnitSchema = z.infer<typeof unitSchema>;
