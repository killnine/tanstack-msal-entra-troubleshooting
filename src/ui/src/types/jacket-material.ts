import { z } from 'zod'
import { productLineSchema } from './product-line'
import { itemSchema } from '@/types/item.ts'

export const jacketMaterialSchema = z.object({
  id: z.number(),
  material: itemSchema,
  quantity: z.number(),
  version: z.string().nullable().optional(),
})

export const materialSummarySchema = z.object({
  sku: z.string(),
  productLine: productLineSchema,
})

export type JacketMaterial = z.infer<typeof jacketMaterialSchema>
export type MaterialSummary = z.infer<typeof materialSummarySchema>
