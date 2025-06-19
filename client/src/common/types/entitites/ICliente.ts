import { IDomicilio } from './IDomicilio'
import { IPedido } from './IPedido'

export interface ICliente {
  id?: number
  nombre: string
  apellido: string
  telefono: string
  email: string
  usuarioId?: number
  password?: string
  domicilios?: IDomicilio[]
  listaPedidos?: IPedido[]
  imagen?: string
}
