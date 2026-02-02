import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import type { AuthService } from '../services/auth-service'

const getBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`
  }

  return import.meta.env.VITE_REACT_APP_API_URL || 'http://localhost:5003'
}

let injectedAuthService: AuthService | null = null

const API_BASE_URL = getBaseUrl()
const API_SCOPES: string[] = ['api://4d97f8f8-3b4f-41d0-9817-b74c24578207/Core.All']

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL + '/api',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.client.interceptors.request.use(async (config) => {
      try {
        // NOTE: Only set header if not already present
        const hasAuthHeader = !!(config.headers as Record<string, unknown>)['Authorization']
        if (hasAuthHeader) return config

        if (!injectedAuthService) {
          return config
        }

        const token = await injectedAuthService.getAccessToken(API_SCOPES)
        if (token) {
          ;(config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
        }
      } catch (err) {
        // NOTE: proceed without header if token acquisition fails
        console.warn('[apiClient] Failed to attach auth token:', err)
      }
      return config
    })
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config)
    return response.data
  }

  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config)
    return response.data
  }

  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config)
    return response.data
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config)
    return response.data
  }
}

export const apiClient = new ApiClient()

// Allow wiring the AuthService from React context without introducing a hard dependency
export function setApiAuthService(service: AuthService | null) {
  injectedAuthService = service
}
