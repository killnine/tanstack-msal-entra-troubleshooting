import { Suspense } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { JacketsListSkeleton } from '@/components/jackets/jackets-list-skeleton'
import { Button } from '@/components/ui/button.tsx'
import { UnauthorizedWidget } from '@/components/layout/unauthorized-widget.tsx'

export const Route = createFileRoute('/_auth/jackets/')({
  beforeLoad: ({ context }) => {
    return {
      hasPermission: context.auth.hasPermission
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { hasPermission } = Route.useRouteContext()

  const handleGoToJacket = () => {
    void navigate({ to: '/jackets/1' })
  }

  return (
    <>
      {!hasPermission('Jacket_Read') && <UnauthorizedWidget />}
      {hasPermission('Jacket_Read') && (
        <Suspense fallback={<JacketsListSkeleton />}>
          <div className="container mx-auto py-6">
            <div className="flex flex-wrap">
              <h1 className="text-3xl font-bold mb-6">Job Jacket List</h1>
            </div>
            <Button variant="default" size="lg" onClick={handleGoToJacket}>
              Go to Jacket
            </Button>
          </div>
        </Suspense>
      )}
    </>
  )
}
