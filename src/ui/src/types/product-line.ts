import { z } from 'zod'

export const productLineSchema = z.object({
  id: z.number(),
  code: z.string(),
  description: z.string(),
})

export type ProductLine = z.infer<typeof productLineSchema>
