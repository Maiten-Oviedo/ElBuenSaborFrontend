export default function httpClient() {
  async function customFetch(endpoint: string, options: RequestInit) {
    const defaultHeader = {
      // Authorization:
      //   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYWl0ZW5AZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6IkNSRUFURSJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9FTVBMRUFETyJ9XSwiaWF0IjoxNzQ5Njg1NDA3LCJleHAiOjE3NDk3NzE4MDd9.x4SvEmsYJDPPnZor_pY7ioURajdvvCBR6-XXOcud2z4',

      'Content-Type': 'application/json',
      accept: 'application/json',
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000) // Guardar el timeoutId para limpiar luego

    const finalOptions: RequestInit = {
      ...options,
      method: options.method || 'GET',
      headers: { ...defaultHeader, ...options.headers },
      signal: controller.signal,
    }

    // Si el body es undefined, no lo pongas
    if (!finalOptions.body) {
      delete finalOptions.body
    }

    try {
      const response = await fetch(endpoint, finalOptions)
      clearTimeout(timeoutId)

      if (
        response.status === 204 ||
        response.headers.get('content-length') === '0'
      ) {
        return { message: 'No Content' }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})) // Intentar parsear JSON de error
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

  return {
    get,
    post,
    put,
    del,
  }
}
