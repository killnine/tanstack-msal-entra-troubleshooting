import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { Loader2, Shield, ThumbsUp } from 'lucide-react'
import { useAuth } from '../contexts/auth-context'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx'
import { Button } from '@/components/ui/button.tsx'

function SignOutPage() {
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [signedOut, setSignedOut] = useState(false)
  const navigate = useNavigate()
  const { authService } = useAuth()

  useEffect(() => {
    const performSignOut = async () => {
      if (!signedOut && !isSigningOut) {
        console.log('Initiating sign out process...')
        setIsSigningOut(true)
        try {
          await authService.logout()
          setSignedOut(true)
        } catch (error) {
          console.error('Sign out error:', error)
          setSignedOut(true)
        } finally {
          setIsSigningOut(false)
        }
      }
    }

    void performSignOut()
  }, [signedOut, isSigningOut, authService])

  const handleSignBackIn = () => {
    navigate({ to: '/' })
  }

  if (isSigningOut) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-xl">Signing you out...</CardTitle>
              <CardDescription>Please wait while we securely sign you out.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-400/30 flex items-center justify-center">
            <Shield className="w-6 h-6 text-green-700" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-xl">Sign out complete</CardTitle>
            <CardDescription>You have been successfully signed out.</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <ThumbsUp className="w-6 h-6 text-primary" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center items-center mb-4">
          <Button variant="outline" onClick={() => handleSignBackIn()}>
            Sign Back In
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export const Route = createFileRoute('/sign-out')({
  component: SignOutPage,
})
