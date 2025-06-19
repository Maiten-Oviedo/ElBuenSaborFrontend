import { create } from 'zustand'
import { ICliente } from '@/common/types/entitites/ICliente'
import httpClient from '@/common/lib/httpClient'

type LoginPayload = {
  email: string
  password: string
}

interface AuthState {
  token: string | null
  cliente: ICliente | null
  setCliente: (cliente: ICliente) => void
  loginWithGoogle: (token: string) => Promise<void>
  login: (credentials: LoginPayload) => Promise<void>
  register: (userData: {
    password: string
    nombre: string
    apellido: string
    email: string
    telefono: string
  }) => Promise<void>
  logout: () => void
  loadToken: () => void
  setToken: (token: string) => void
}

export const useAuthStore = create<AuthState>(set => ({
  cliente: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,

  setCliente: cliente => {
    localStorage.setItem('cliente', JSON.stringify(cliente))
    set({ cliente })
  },

  loginWithGoogle: async (externalToken: string) => {
    try {
      const data = await httpClient().post(
        'http://localhost:8080/auth/validate-google-token',
        {
          headers: {
            Authorization: `Bearer ${externalToken}`,
          },
        }
      )

      if (!data?.token || !data?.cliente)
        throw new Error(data.message || 'Error en autenticación')

      localStorage.setItem('token', data.token)
      localStorage.setItem('cliente', JSON.stringify(data.cliente))
      set({ token: data.token, cliente: data.cliente })
    } catch (error) {
      console.error('Google auth error:', error)
      throw error
    }
  },

  login: async ({ email, password }) => {
    try {
      const data = await httpClient().post('http://localhost:8080/auth/login', {
        body: JSON.stringify({ email, password }),
      })

      if (!data?.token || !data?.cliente)
        throw new Error(data.message || 'Error al iniciar sesión')

      localStorage.setItem('token', data.token)
      localStorage.setItem('cliente', JSON.stringify(data.cliente))
      set({ token: data.token, cliente: data.cliente })
    } catch (err) {
      console.error('Login error', err)
      throw err
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

      if (data.token && data.cliente) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('cliente', JSON.stringify(data.cliente))
        set({ token: data.token, cliente: data.cliente })
      } else {
        throw new Error(data.message || 'Error al registrar')
      }
    } catch (err) {
      console.error('Register error', err)
      throw err
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('cliente')
    localStorage.removeItem('cart')
    set({ token: null, cliente: null })
  },

  loadToken: () => {
    const token = localStorage.getItem('token')
    const cliente = localStorage.getItem('cliente')
    if (token && cliente) {
      set({ token, cliente: JSON.parse(cliente) })
    }
  },

  setToken: token => {
    localStorage.setItem('token', token)
    set({ token })
  },
}))
