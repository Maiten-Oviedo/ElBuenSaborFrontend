import type { IRol } from './IRol'

export interface IEmpleado {
  id: number
  nombre: string
  apellido: string
  telefono: string
  email: string
  activo: boolean
  rol: IRol
}

// NuevoEmpleado.ts (para crear/actualizar)
export interface NuevoEmpleado {
  nombre: string
  apellido: string
  telefono: string
  email: string
  password: string
  rolId: number
}

// types/EmpleadoUpdate.ts
export type EmpleadoUpdate = {
  nombre: string
  apellido: string
  telefono: string
  email: string
  activo: boolean
  rolId: number
}
