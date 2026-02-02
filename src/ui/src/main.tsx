import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import * as TanStackQueryProvider from '@/integrations/tanstack-query/root-provider.tsx'
import AuthProvider, { useAuth } from '@/contexts/auth-context.tsx'
import { AuthInitializingLoader } from '@/components/auth/auth-initializing-loader.tsx'

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProvider.getContext(),
    auth: undefined!, // NOTE: Set within RouterProvider
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

export default function AppContent() {
  const {
    isInitialized,
    authService,
    msalInstance,
    updateCurrentAccount,
    hasRole,
    hasAnyRole,
    hasPermission,
    hasAnyPermission,
    currentUser,
    currentAccount,
  } = useAuth()

  if (!isInitialized) {
    return <AuthInitializingLoader />
  }

  return (
    <RouterProvider
      router={router}
      context={{
        ...TanStackQueryProvider.getContext(),
        auth: {
          msalInstance: msalInstance,
          isInitialized: isInitialized,
          updateCurrentAccount: updateCurrentAccount,
          hasRole: hasRole,
          hasAnyRole: hasAnyRole,
          hasPermission: hasPermission,
          hasAnyPermission: hasAnyPermission,
          currentUser: currentUser,
          currentAccount: currentAccount,
          authService: authService,
        },
      }}
    />
  )
}

function App() {
  return (
    <AuthProvider>
      <TanStackQueryProvider.Provider>
          <AppContent />
      </TanStackQueryProvider.Provider>
    </AuthProvider>
  )
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

reportWebVitals()
