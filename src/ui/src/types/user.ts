import { z } from 'zod'
import { permissionSchema, roleSchema } from '@/types/permissions.ts'

export const userSchema = z.object({
  id: z.number(),
  userName: z.string(),
  roles: z.array(roleSchema),
  permissions: z.array(permissionSchema),
})

export type User = z.infer<typeof userSchema>
