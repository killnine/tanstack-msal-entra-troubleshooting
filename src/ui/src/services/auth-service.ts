import { loginRequest } from '../integrations/microsoft-auth/msal-config.ts'
import type { AccountInfo, AuthenticationResult, PublicClientApplication } from '@azure/msal-browser'

export class AuthService {
  constructor(private msalInstance: PublicClientApplication) {}

  async login(): Promise<AuthenticationResult> {
    try {
      return await this.msalInstance.loginPopup(loginRequest)
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      await this.msalInstance.logoutRedirect()
    } catch (error) {
      console.error('Logout error:', error)
      await this.msalInstance.clearCache()
    }
  }

  isAuthenticated(): boolean {
    const accounts = this.msalInstance.getAllAccounts()
    return accounts.length > 0
  }

  getCurrentAccount(): AccountInfo | null {
    const accounts = this.msalInstance.getAllAccounts()
    return accounts.length > 0 ? accounts[0] : null
  }

  async getAccessToken(scopes?: string[]): Promise<string | null> {
    const account = this.getCurrentAccount()
    if (!account) return null

    try {
      const result = await this.msalInstance.acquireTokenSilent({
        account,
        scopes: scopes && scopes.length > 0 ? scopes : loginRequest.scopes,
      })
      return result.accessToken || null
    } catch (err) {
      console.warn('[AuthService] acquireTokenSilent failed:', err)
      return null
    }
  }
}
