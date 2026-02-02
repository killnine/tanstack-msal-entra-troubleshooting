import { z } from 'zod'

export const roleSchema = z.object({
  roleId: z.number(),
  name: z.string(),
})

export const permissionSchema = z.object({
  permissionId: z.number(),
  name: z.string(),
})

export type Role = z.infer<typeof roleSchema>
export type Permission = z.infer<typeof permissionSchema>
