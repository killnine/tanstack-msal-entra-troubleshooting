import { Outlet, createFileRoute } from '@tanstack/react-router'
import { MsalAuthenticationTemplate } from '@azure/msal-react'
import { InteractionType } from '@azure/msal-browser'
import Layout from '@/components/layout/layout.tsx'
import { AuthInitializingLoader } from '@/components/auth/auth-initializing-loader.tsx'
import { AuthFailed } from '@/components/auth/auth-failed.tsx'

export const Route = createFileRoute('/_auth')({
  component: RouteWrapper,
})

function RouteWrapper() {
  const authRequest = {
    scopes: ['openid', 'profile'],
  }

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
      loadingComponent={AuthInitializingLoader}
      errorComponent={AuthFailed}
    >
      <Layout>
        <Outlet />
      </Layout>
    </MsalAuthenticationTemplate>
  )
}
