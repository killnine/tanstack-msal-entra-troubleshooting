import { z } from 'zod'
import { itemSummarySchema } from '@/types/item.ts'
import { materialSummarySchema } from '@/types/jacket-material.ts'
import { customerSummarySchema } from '@/types/customer.ts'

export const jobJacketSummarySchema = z.object({
  id: z.number(),
  workOrderNumber: z.string(),
  jacketDate: z.string().datetime(),
  items: z.array(itemSummarySchema),
  customers: z.array(customerSummarySchema),
  materials: z.array(materialSummarySchema),
})

export type JobJacketSummary = z.infer<typeof jobJacketSummarySchema>
