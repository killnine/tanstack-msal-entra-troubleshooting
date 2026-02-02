import { z } from 'zod'

export const pressEstimateSchema = z.object({
  quantity: z.number(),
  unitOfMeasure: z.number(),
})

export type PressEstimate = z.infer<typeof pressEstimateSchema>
