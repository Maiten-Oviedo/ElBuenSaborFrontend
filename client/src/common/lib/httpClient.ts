'use client'

import { useAuthStore } from '@/common/store/useAuthStore'

export default function httpClient() {
  async function customFetch(endpoint: string, options: RequestInit) {
    const token = useAuthStore.getState().token
    const isFormData = options.body instanceof FormData

    const headers: HeadersInit = {
      accept: 'application/json, text/plain',
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const finalOptions: RequestInit = {
      ...options,
      method: options.method || 'GET',
      headers: { ...headers, ...options.headers },
      signal: controller.signal,
      credentials: 'include',
    }

    if (isFormData) {
      delete (finalOptions.headers as Record<string, string>)['Content-Type']
    }

    try {
      const response = await fetch(endpoint, finalOptions)
      clearTimeout(timeoutId)

      const contentType = response.headers.get('Content-Type') || ''

      if (response.status === 204) return { message: 'No Content' }

      if (!response.ok) {
        // Intenta leer como JSON, si no se puede, cae en un error genérico
        const errorData = await response.json().catch(() => ({}))
        throw {
          cause: response.status,
          message: errorData.message || 'Fetch Error',
        }
      }

      // Manejo defensivo según tipo de contenido
      if (contentType.includes('application/json')) {
        return await response.json()
      } else {
        // Si no es JSON, devolvemos texto como mensaje
        const text = await response.text()
        return { message: text }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw { status: 408, message: 'Request Timeout' }
      }
      throw error
    }
  }

  return {
    get: (endpoint: string, options: RequestInit = {}) =>
      customFetch(endpoint, options),
    post: (endpoint: string, options: RequestInit = {}) =>
      customFetch(endpoint, { ...options, method: 'POST' }),
    put: (endpoint: string, options: RequestInit = {}) =>
      customFetch(endpoint, { ...options, method: 'PUT' }),
    del: (endpoint: string, options: RequestInit = {}) =>
      customFetch(endpoint, { ...options, method: 'DELETE' }),
    patch: (endpoint: string, options: RequestInit = {}) =>
      customFetch(endpoint, { ...options, method: 'PATCH' }),
  }
}
