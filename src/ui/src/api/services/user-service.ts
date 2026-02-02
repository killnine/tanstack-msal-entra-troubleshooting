import type { User } from '@/types/user.ts'
import { apiClient } from '@/api/client.ts'

export const userService = {
  getUser: async (): Promise<User> => {
    const url = `/user/`

    return await apiClient.get<User>(url)
  },
}
