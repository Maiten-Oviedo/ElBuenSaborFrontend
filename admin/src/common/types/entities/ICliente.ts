import { IUser } from '../login.types'
import { IDomicilio } from './IDomicilio'
import { IImagenArticulo } from './IImagenArticulo'
import { IPedido } from './IPedido'
import { IPersona } from './IPersona'

export interface ICliente extends IPersona {
  //relaciones
  domicilio?: IDomicilio[]
  usuario?: IUser
  listaPedidos?: IPedido[]
  imagen?: IImagenArticulo
  cantidadPedidosFinalizados?: number
  totalPedidosFinalizados?: number
}
