// useAuthStore.ts
import { IUser } from '@/common/types/entities/IUser'
import { create } from 'zustand'

interface AuthState {
  empleado: IUser | null
  setEmpleado: (empleado: IUser) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>(set => ({
  empleado:
    typeof window !== 'undefined' && localStorage.getItem('empleado')
      ? JSON.parse(localStorage.getItem('empleado') as string)
      : null,

  setEmpleado: empleado => {
    localStorage.setItem('empleado', JSON.stringify(empleado))
    set({ empleado })
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
    } catch (error) {
      console.warn('Error al hacer logout en API local', error)
    } finally {
      localStorage.removeItem('token')
      localStorage.removeItem('empleado')
      set({ empleado: null })
    }
  },
}))
