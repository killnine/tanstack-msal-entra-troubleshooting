import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { Shield } from 'lucide-react'
import { useAuth } from '../contexts/auth-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { Button } from '@/components/ui/button.tsx'

function LoginPage() {
  const [isLogging, setIsLogging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const { authService } = useAuth()

  const handleLogin = async () => {
    setIsLogging(true)
    setError(null)
    try {
      await authService.login()
      void navigate({ to: '/' })
    } catch (e) {
      setError('Failed to sign in. Please try again.')
      console.error('Login failed:', e)
    } finally {
      setIsLogging(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-xl">Sign into Job Planning</CardTitle>
            <CardDescription>Please sign in to access the application.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="flex justify-center items-center space-y-4">
          <Button variant="default" size="lg" onClick={handleLogin} disabled={isLogging}>
            {isLogging ? 'Signing in...' : 'Sign In with Microsoft'}
          </Button>
          {error && <div className="text-red-500 text-sm">{error}</div>}
        </CardContent>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/login')({
  component: LoginPage,
})
