import { IArticulo } from './IArticulo'
import { IPedido } from './IPedido'
import { IPersona } from './IPersona'

export interface ISucursal {
  id: number
  nombre: string
  horarioApertura: string
  horarioCierre: string

  //relaciones
  idDomicilio: number
  idEmpresa: number
  listaPersonas: IPersona[]
  listaPedidos: IPedido[]
  listaArticulos: IArticulo[]
}
