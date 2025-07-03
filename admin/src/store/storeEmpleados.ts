import { create } from 'zustand'
import httpClient from '@/common/lib/httpClient'
import type {
  EmpleadoUpdate,
  IEmpleado,
  NuevoEmpleado,
} from '@/common/types/entities/IEmpleado'
import { IRol } from '@/common/types/entities/IRol'
import { useAuthStore } from './useAuthStore'

type EmpleadoStore = {
  empleados: IEmpleado[]
  roles: IRol[]
  isLoading: boolean
  error: string | null

  // Métodos
  fetchRoles: () => Promise<void>
  fetchEmpleados: () => Promise<void>
  fetchEmpleadoById: (id: number) => Promise<IEmpleado | null>
  createEmpleado: (empleado: NuevoEmpleado) => Promise<void>
  updateEmpleado: (id: number, empleado: EmpleadoUpdate) => Promise<void>
  deleteEmpleado: (id: number) => Promise<void>
}

export const useEmpleadoStore = create<EmpleadoStore>((set, get) => ({
  empleados: [],
  roles: [],
  isLoading: false,
  error: null,

  // Fetch roles
  fetchRoles: async () => {
    set({ isLoading: true, error: null })
    try {
      const res = await httpClient().get('http://localhost:8080/rol/getAll')
      set({ roles: res, isLoading: false })
    } catch (err) {
      console.error('❌ Error al obtener roles:', err)
      set({ error: 'Error al obtener los roles.', isLoading: false })
    }
  },

  // Fetch todos los empleados
  fetchEmpleados: async () => {
    set({ isLoading: true, error: null })

    const { empleado: empleadoActual } = useAuthStore.getState()

    try {
      const res = await httpClient().get(
        'http://localhost:8080/empleados/getAll'
      )

      const empleadosFiltrados = res.filter(
        (empleado: IEmpleado) => empleado.id !== empleadoActual?.id
      )

      set({ empleados: empleadosFiltrados, isLoading: false })
    } catch (err) {
      console.error('❌ Error al obtener empleados:', err)
      set({ error: 'Error al obtener los empleados.', isLoading: false })
    }
  },

  // Fetch empleado por ID
  fetchEmpleadoById: async (id: number) => {
    set({ isLoading: true, error: null })
    try {
      const res = await httpClient().get(
        `http://localhost:8080/empleados/${id}`
      )
      set({ isLoading: false })
      return res as IEmpleado
    } catch (err) {
      console.error(`❌ Error al obtener empleado ${id}:`, err)
      set({ error: 'Error al obtener el empleado.', isLoading: false })
      return null
    }
  },

  // Crear empleado
  createEmpleado: async (dto: any) => {
    set({ isLoading: true, error: null })
    try {
      await httpClient().post('http://localhost:8080/empleados', {
        body: JSON.stringify(dto),
      })
      await get().fetchEmpleados() // Refrescar automáticamente
    } catch (err) {
      console.error('❌ Error al crear empleado:', err)
      set({ error: 'Error al crear el empleado.' })
      throw err
    } finally {
      set({ isLoading: false })
    }
  },

  // Actualizar empleado
  updateEmpleado: async (id: number, empleado: EmpleadoUpdate) => {
    set({ isLoading: true, error: null })
    try {
      await httpClient().put(`http://localhost:8080/empleados/complete/${id}`, {
        body: JSON.stringify(empleado),
      })
      await get().fetchEmpleados() // Refrescar la lista
    } catch (err) {
      console.error(`❌ Error al actualizar empleado ${id}:`, err)
      set({ error: 'Error al actualizar el empleado.' })
    } finally {
      set({ isLoading: false })
    }
  },

  // Eliminar empleado
  deleteEmpleado: async (id: number) => {
    console.log('llega al store el empelado con id; ', id)
    set({ isLoading: true, error: null })
    try {
      await httpClient().del(`http://localhost:8080/empleados/${id}`)
    } catch (err) {
      console.error(`❌ Error al eliminar empleado ${id}:`, err)
      set({ error: 'Error al eliminar el empleado.' })
    } finally {
      await get().fetchEmpleados() // Refrescar la lista
      set({ isLoading: false })
    }
  },
}))
