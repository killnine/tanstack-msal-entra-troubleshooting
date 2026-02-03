import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import './styles.css'
import reportWebVitals from './reportWebVitals.ts'
import * as TanStackQueryProvider from '@/integrations/tanstack-query/root-provider.tsx'
import AuthProvider, { useAuth } from '@/contexts/auth-context.tsx'
import { AuthInitializingLoader } from '@/components/auth/auth-initializing-loader.tsx'

const router = createRouter({
  routeTree,
  context: {
    ...TanStackQueryProvider.getContext(),
    auth: undefined!,
  },
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

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
    console.log('[AppContent] Waiting for auth initialization')
    return <AuthInitializingLoader />
  }

  console.log('[AppContent] Auth initialized, rendering router')

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

const rootElement = document.getElementById('app')!
const root = ReactDOM.createRoot(rootElement)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

reportWebVitals()
