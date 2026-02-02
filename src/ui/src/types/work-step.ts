import { z } from 'zod'
import { workStepTypeSchema } from '@/types/work-step-type-schema.ts'

export const workStepSchema = z.object({
  id: z.number(),
  workStepType: workStepTypeSchema,
  content: z.string(),
  version: z.string().nullable().optional(),
})

export type WorkStep = z.infer<typeof workStepSchema>
