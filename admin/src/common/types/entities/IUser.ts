import { IRol } from './IRol'
import { RolEnum } from './RolEnum'

export interface IUser {
  id: number
  nombre: string
  apellido: string
  telefono: string
  email: string
  rol: RolEnum
}

//Esta es solo para manejar las respuestas del backend que traen el rol como objeto
export interface IUserResponse {
  id: number
  nombre: string
  apellido: string
  telefono: string
  email: string
  rol: IRol
}
