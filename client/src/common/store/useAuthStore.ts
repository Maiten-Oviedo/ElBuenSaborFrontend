import { create } from 'zustand'

import httpClient from '@/common/lib/httpClient'
import { ICliente } from '../types/entitites/ICliente'

type LoginPayload = {
  email: string
  password: string
}

interface AuthState {
  token: string | null
  cliente: ICliente | null
  setCliente: (cliente: ICliente) => void
  setToken: (token: string) => void
  loginWithGoogle: () => Promise<void>
  login: (credentials: LoginPayload) => Promise<void>
  register: (userData: {
    password: string
    nombre: string
    apellido: string
    email: string
    telefono: string
  }) => Promise<void>
  logout: () => Promise<void>
  loadToken: () => void
}

const getTokenFromStorage = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token')
  }
  return null
}

const getClienteFromStorage = (): ICliente | null => {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem('cliente')
    try {
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  }
  return null
}

export const useAuthStore = create<AuthState>(set => ({
  token: getTokenFromStorage(),
  cliente: getClienteFromStorage(),

  setToken: token => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token)
    }
    set({ token })
  },

  setCliente: cliente => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cliente', JSON.stringify(cliente))
    }
    set({ cliente })
  },

  loginWithGoogle: async () => {
    try {
      const data = await httpClient().post(
        'http://localhost:8080/auth/validate-google-token',
        {
          credentials: 'include',
        }
      )

      if (!data?.user) throw new Error(data.message || 'Error en autenticación')

      const user = data.user
      if (typeof window !== 'undefined') {
        localStorage.setItem('cliente', JSON.stringify(user))
      }

      set({ cliente: user })
    } catch (error) {
      console.error('Google auth error:', error)
      throw error
    }
  },

  login: async ({ email, password }) => {
    try {
      const data = await httpClient().post('http://localhost:8080/auth/login', {
        body: JSON.stringify({ email, password, tipoLogin: 'CLIENTE' }),
        credentials: 'include',
      })

      if (!data?.user) {
        const backendMsg = data?.message ?? 'Credenciales incorrectas'
        throw new Error(backendMsg)
      }

      const user = data.user

      if (typeof window !== 'undefined') {
        localStorage.setItem('cliente', JSON.stringify(user))
      }

      set({ cliente: user })
    } catch (err) {
      let message = 'Ocurrió un error al iniciar sesión'

      if (err instanceof Error) {
        message = err.message
      } else if (typeof err === 'object' && err !== null && 'message' in err) {
        message = String((err as any).message)
      }

      throw new Error(message)
    }
  },

  register: async userData => {
    try {
      const data = await httpClient().post(
        'http://localhost:8080/auth/register',
        {
          body: JSON.stringify(userData),
        }
      )

      if (data?.user && data?.token) {
        const user = data.user
        const token = data.token

        if (typeof window !== 'undefined') {
          localStorage.setItem('cliente', JSON.stringify(user))
          localStorage.setItem('token', token)
        }

        set({ cliente: user, token })
      } else {
        throw new Error(data.message || 'Error al registrar')
      }
    } catch (err) {
      console.error('Register error', err)
      throw err
    }
  },

  logout: async () => {
    try {
      await httpClient().post('http://localhost:8080/auth/logout', {
        credentials: 'include',
      })
    } catch (err: unknown) {
      console.info(
        `Ocurrio un error al hacer logout: ${(err as Error).message}`
      )
      console.warn('Logout request falló pero se continuará con limpieza local')
    }

    if (typeof window !== 'undefined') {
      localStorage.removeItem('cliente')
      localStorage.removeItem('token')
      localStorage.removeItem('cart') // si usás carrito
    }

    set({ cliente: null, token: null })
  },

  loadToken: () => {
    const token = getTokenFromStorage()
    const cliente = getClienteFromStorage()

    if (token && cliente) {
      set({ token, cliente })
    }
  },
}))
