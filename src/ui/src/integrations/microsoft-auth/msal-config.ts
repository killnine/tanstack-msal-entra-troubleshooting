export const msalConfig = {
  auth: {
    clientId:
      import.meta.env.VITE_REACT_APP_MSAL_CLIENT_ID ||
      (() => {
        throw new Error('VITE_REACT_APP_MSAL_CLIENT_ID is required')
      })(),
    authority:
      import.meta.env.VITE_REACT_APP_MSAL_AUTHORITY ||
      (() => {
        throw new Error('VITE_REACT_APP_MSAL_AUTHORITY is required')
      })(),
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage' as const,
    storeAuthStateInCookie: false,
  },
}

export const loginRequest = {
  scopes: ['openid', 'profile', 'User.Read'],
}
