export default function httpClient() {
  
  async function customFetch(endpoint: string, options: RequestInit) {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const finalOptions: RequestInit = {
      ...options,
      method: options.method || 'GET',
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      credentials: 'include', // ENVIAR COOKIE EN CADA PETICIÓN
      signal: controller.signal,
    }

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
