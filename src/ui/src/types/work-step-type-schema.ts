import { z } from 'zod'

export const workStepTypeSchema = z.object({
  id: z.number(),
  name: z.string(),
  icon: z.string(),
  ordinal: z.number(),
})

export type WorkStepType = z.infer<typeof workStepTypeSchema>
