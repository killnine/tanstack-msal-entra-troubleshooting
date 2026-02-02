import { z } from 'zod'

export const productLineOverrunConfigurationSchema = z.object({
  productLineCode: z.string(),
  productLine: z.number(),
  overrunPercentage: z.coerce.number().min(0).max(100),
})

export const applicationSettingsSchema = z.object({
  defaultOverrunPercentage: z.coerce.number().min(0).max(100),
  productLineOverrunConfiguration: z.array(productLineOverrunConfigurationSchema),
  version: z.string().optional(),
})

export type ApplicationSettings = z.infer<typeof applicationSettingsSchema>
