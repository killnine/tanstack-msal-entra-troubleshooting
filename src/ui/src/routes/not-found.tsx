import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { ArrowLeft, Home, ShieldQuestionMark } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Button } from '@/components/ui/button.tsx'
import { Alert, AlertDescription } from '@/components/ui/alert.tsx'

export const Route = createFileRoute('/not-found')({
  component: NotFound,
})

export default function NotFound() {
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
          <div className="mx-auto w-16 h-16 rounded-full bg-yellow-500/10 flex items-center justify-center">
            <ShieldQuestionMark className="w-8 h-8 text-yellow-500" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl">Not Found</CardTitle>
            <CardDescription>The page you requested was not found</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="warning">
            <AlertDescription className="text-sm text-muted-foreground text-center">
              Please check the URL and verify it is correct. If you believe you are seeing this in error,
              please contact your system administrator.
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
