import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { EventType, PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { msalConfig } from '../integrations/microsoft-auth/msal-config.ts'
import { AuthService } from '../services/auth-service'
import { setApiAuthService } from '../api/client'
import type { ReactNode } from 'react'
import type { AccountInfo } from '@azure/msal-browser'
import type { User } from '@/types/user.ts'
import { userService } from '@/api/services/user-service.ts'

interface AuthContextType {
  msalInstance: PublicClientApplication
  authService: AuthService
  isInitialized: boolean
  currentAccount: AccountInfo | null
  currentUser: User | null
  hasRole: (role: string) => boolean
  hasAnyRole: (roles: string[]) => boolean
  hasPermission: (permission: string) => boolean
  hasAnyPermission: (permissions: string[]) => boolean
  updateCurrentAccount: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [msalInstance] = useState(() => new PublicClientApplication(msalConfig))
  const [authService] = useState(() => new AuthService(msalInstance))
  const [isInitialized, setIsInitialized] = useState(false)
  const [currentAccount, setCurrentAccount] = useState<AccountInfo | null>(null)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const hasRole = useCallback(
    (role: string) => {
      return currentUser?.roles.some((r) => r.name === role) ?? false
    },
    [currentUser],
  )

  const hasAnyRole = useCallback(
    (roles: string[]) => {
      if (!currentUser?.roles) {
        return false
      }
      return roles.some((role) => currentUser.roles.some((r) => r.name === role))
    },
    [currentUser],
  )

  const hasPermission = useCallback(
    (permission: string) => {
      return currentUser?.permissions.some((p) => p.name === permission) ?? false
    },
    [currentUser],
  )

  const hasAnyPermission = useCallback(
    (permissions: string[]) => {
      return permissions.some((permission) => currentUser?.permissions.some((p) => p.name === permission))
    },
    [currentUser],
  )

  const updateCurrentAccount = useCallback(async () => {
    const account = authService.getCurrentAccount()
    setCurrentAccount(account)

    if (account) {
      const user = await userService.getUser()
      setCurrentUser(user)
    } else {
      setCurrentUser(null)
    }
  }, [authService])

  useEffect(() => {
    const callbackId = msalInstance.addEventCallback((event) => {
      if (
        event.eventType === EventType.LOGIN_SUCCESS ||
        event.eventType === EventType.LOGOUT_SUCCESS ||
        event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
      ) {
        void updateCurrentAccount()
      }
    })

    return () => {
      if (callbackId) {
        msalInstance.removeEventCallback(callbackId)
      }
    }
  }, [msalInstance, updateCurrentAccount])

  useEffect(() => {
    const initialize = async () => {
      await msalInstance.initialize()
      setApiAuthService(authService)
      await updateCurrentAccount()
      setIsInitialized(true)
    }

    void initialize()

    return () => {
      setApiAuthService(null)
    }
  }, [])

  const value = useMemo(
    () => ({
      msalInstance,
      authService,
      isInitialized,
      currentAccount,
      currentUser,
      hasRole,
      hasAnyRole,
      hasPermission,
      hasAnyPermission,
      updateCurrentAccount,
    }),
    [
      msalInstance,
      authService,
      isInitialized,
      currentAccount,
      currentUser,
      hasRole,
      hasAnyRole,
      hasPermission,
      hasAnyPermission,
      updateCurrentAccount,
    ],
  )

  return (
    <AuthContext.Provider value={value}>
      <MsalProvider instance={msalInstance}>{children}</MsalProvider>
    </AuthContext.Provider>
  )
}
