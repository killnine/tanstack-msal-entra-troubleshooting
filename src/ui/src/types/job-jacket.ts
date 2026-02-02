import { z } from 'zod'
import { jacketItemSchema } from '@/types/item.ts'
import { jacketCustomerSchema } from '@/types/customer.ts'
import { jacketMaterialSchema } from '@/types/jacket-material.ts'
import { workStepSchema } from '@/types/work-step.ts'
import { pressEstimateSchema } from '@/types/press-estimate.ts'

export const jobJacketSchema = z.object({
  id: z.number(),
  jacketDate: z.coerce.date(),
  workOrderNumber: z.string().min(1, 'Work order number is required'),
  salesOrderNumber: z.string().optional(),
  customerPurchaseOrderNumber: z.string().optional(),
  jacketCustomers: z.array(jacketCustomerSchema),
  jacketItems: z.array(jacketItemSchema).min(1, 'At least one Item is required'),
  jacketMaterials: z.array(jacketMaterialSchema).optional(),
  workSteps: z.array(workStepSchema).optional(),
  estimate: pressEstimateSchema,
  version: z.string().nullable().optional(),
})

export type JobJacket = z.infer<typeof jobJacketSchema>
