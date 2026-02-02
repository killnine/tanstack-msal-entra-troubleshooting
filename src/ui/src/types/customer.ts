import { z } from 'zod'

export const customerSchema = z.object({
  id: z.number(),
  customerCode: z.string(),
  name: z.string(),
  overrunPercentage: z.number().nullable().optional(),
  version: z.string().optional(),
})

export const customerSummarySchema = z.object({
  name: z.string(),
  customerCode: z.string(),
})

export const jacketCustomerSchema = z.object({
  id: z.number(),
  version: z.string().nullable().optional(),
  customer: customerSchema,
  overrunPercentage: z.number().nullable().optional(),
})

export type Customer = z.infer<typeof customerSchema>
export type CustomerSummary = z.infer<typeof customerSummarySchema>
export type JacketCustomer = z.infer<typeof jacketCustomerSchema>
