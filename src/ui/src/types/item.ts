import { z } from 'zod'
import { productLineSchema } from '@/types/product-line.ts'

export const jacketItemSpecificationValueSchema = z.object({
  id: z.number(),
  specificationId: z.number(),
  name: z.string(),
  value: z.string().nullable().optional(),
  overrideValue: z.string().nullable().optional(),
  category: z.string(),
  isVisible: z.boolean(),
  isRequired: z.boolean(),
  isEditable: z.boolean(),
  options: z.record(z.string()).optional(),
  version: z.string().nullable().optional(),
})

export const itemSpecificationValueSchema = z.object({
  id: z.number(),
  specificationId: z.number(),
  name: z.string(),
  value: z.string(),
  category: z.string(),
  isVisible: z.boolean(),
  isRequired: z.boolean(),
  isEditable: z.boolean(),
  options: z.record(z.string()).optional(),
  version: z.string().nullable().optional(),
})

export const itemSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  unitOfMeasureId: z.number(),
  unitOfMeasure: z.string(),
  productLine: productLineSchema,
  sku: z.string(),
  specificationValues: z.array(itemSpecificationValueSchema),
  version: z.string().optional(),
})

export const itemSummarySchema = itemSchema.pick({
  sku: true,
  productLine: true,
})

export const jacketItemSchema = z.object({
  id: z.number(),
  itemId: z.number(),
  version: z.string().nullable().optional(),
  sku: z.string(),
  name: z.string(),
  description: z.string(),
  unitOfMeasure: z.string(),
  unitOfMeasureId: z.number(),
  productLine: productLineSchema,
  itemSpecifications: z.array(jacketItemSpecificationValueSchema),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  adjustedQuantity: z.number().min(1),
  customOverrunPercentage: z.coerce.number().min(0, 'Quantity must be zero or greater').optional(),
  defaultOverrunPercentage: z.coerce.number().min(0, 'Quantity must be zero or greater').optional(),
})

export type Item = z.infer<typeof itemSchema>

export type JacketItem = z.infer<typeof jacketItemSchema>
export type ItemSummary = z.infer<typeof itemSummarySchema>
export type JacketItemSpecificationValue = z.infer<typeof jacketItemSpecificationValueSchema>
