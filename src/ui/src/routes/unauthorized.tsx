import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { ArrowLeft, Home, ShieldX } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Alert, AlertDescription } from '@/components/ui/alert.tsx'

export const Route = createFileRoute('/unauthorized')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate()
  const { history } = useRouter()

  const handleGoBack = () => {
    history.go(-1)
  }

  const handleGoHome = () => {
    void navigate({ to: '/' })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
            <ShieldX className="w-8 h-8 text-destructive" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl">Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertDescription className="text-sm text-muted-foreground text-center">
              If you believe you should have access to this resource, please contact your system
              administrator.
            </AlertDescription>
          </Alert>
          <div className="flex flex-col gap-2">
            <Button variant="default" size="lg" onClick={handleGoHome} className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Go to Home
            </Button>
            <Button variant="outline" size="lg" onClick={handleGoBack} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
