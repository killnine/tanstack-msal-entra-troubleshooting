import { ShieldAlert } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Button } from '@/components/ui/button.tsx'

export function AuthFailed() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldAlert className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-xl">Authentication Failed</CardTitle>
            <CardDescription>We're sorry, we were not able to log you in</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <Button
              variant="outline"
              size="sm"
              className="w-full max-w-xs"
              onClick={() => window.open('https://dot.net')}
            >
              Create support ticket
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
