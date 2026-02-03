import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import type {
  AccountInfo,
  PublicClientApplication,
} from '@azure/msal-browser'
import type { User } from '@/types/user.ts'
import type { AuthService } from '@/services/auth-service.ts'
import NotFound from '@/routes/not-found.tsx'

interface AuthState {
  msalInstance: PublicClientApplication
  authService: AuthService
  isInitialized: boolean
  currentAccount: AccountInfo | null
  currentUser: User | null
  hasRole: (role: string) => boolean
  hasAnyRole: (roles: string[]) => boolean
  hasPermission: (permission: string) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
  updateCurrentAccount: () => Promise<void>
}

interface JobPlanningRootContext {
  queryClient: any
  auth: AuthState
}

export const Route = createRootRouteWithContext<JobPlanningRootContext>()({
  loader: () => ({
    crumb: 'Home',
  }),
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
  notFoundComponent: () => {
    return <NotFound />
  },
})
