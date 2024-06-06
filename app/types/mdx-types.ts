import type { MetaDescriptor } from "@remix-run/react";
import { ZodType, z } from "zod";

export type FrontMatter = {
  title?: string;
  description?: string;
  draft?: boolean;
  meta?: MetaDescriptor[];
  date?: string;
};

export const FrontMatterSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  draft: z.boolean().optional(),
  meta: z
    .array(
      z.union([
        z.object({ title: z.string() }),
        z.object({ name: z.string(), content: z.string() }),
        z.object({ property: z.string(), content: z.string() }),
      ])
    )
    .optional(),
  date: z.string().optional(),
}) satisfies ZodType<FrontMatter>;
