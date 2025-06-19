'use client'

import { useAuthStore } from '@/common/store/useAuthStore'

export default function httpClient() {
  async function customFetch(endpoint: string, options: RequestInit) {
    const token = useAuthStore.getState().token // Obtiene el token actual sin usar hook

    const defaultHeader: HeadersInit = {
      accept: 'application/json',
      'Content-Type': 'application/json',
    }

    // Agregar el token si está disponible
    if (token) {
      defaultHeader['Authorization'] = `Bearer ${token}`
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const finalOptions: RequestInit = {
      ...options,
      method: options.method || 'GET',
      headers: { ...defaultHeader, ...options.headers },
      signal: controller.signal,
    }

    // Si no hay body, lo eliminamos para evitar conflictos
    if (!finalOptions.body) {
      delete finalOptions.body
    }

    try {
      const response = await fetch(endpoint, finalOptions)
      clearTimeout(timeoutId)

      if (response.status === 204) {
        return { message: 'No Content' }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw {
          cause: response.status,
          message: errorData.message || 'Fetch Error',
        }
      }

      return await response.json()
    } catch (error: unknown) {
      if ((error as Error).name === 'AbortError') {
        throw { status: 408, message: 'Request Timeout' }
      }
      throw error
    }
  }

  const get = (endpoint: string, options: RequestInit = {}) =>
    customFetch(endpoint, options)

  const post = (endpoint: string, options: RequestInit = {}) =>
    customFetch(endpoint, { ...options, method: 'POST' })

  const put = (endpoint: string, options: RequestInit = {}) =>
    customFetch(endpoint, { ...options, method: 'PUT' })

  const del = (endpoint: string, options: RequestInit = {}) =>
    customFetch(endpoint, { ...options, method: 'DELETE' })

  const patch = (endpoint: string, options: RequestInit = {}) =>
    customFetch(endpoint, { ...options, method: 'PATCH' })

  return {
    get,
    post,
    put,
    del,
    patch,
  }
}
