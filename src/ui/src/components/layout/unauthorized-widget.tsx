import { ShieldX } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Alert, AlertDescription } from '@/components/ui/alert.tsx'

export function UnauthorizedWidget() {
  return (
    <div className="container mx-auto py-6 flex items-center justify-center min-h-screen">
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
        </CardContent>
      </Card>
    </div>
  )
}
