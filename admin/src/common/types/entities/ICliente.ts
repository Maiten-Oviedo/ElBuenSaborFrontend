import { IDomicilio } from './IDomicilio'
import { IImagenArticulo } from './IImagenArticulo'
import { IPedido } from './IPedido'
import { IPersona } from './IPersona'

export interface ICliente extends IPersona {
  //relaciones
  domicilios?: IDomicilio[]
  listaPedidos?: IPedido[]
  imagenes?: IImagenArticulo[]
  cantidadPedidosFinalizados?: number
  totalPedidosFinalizados?: number
}
