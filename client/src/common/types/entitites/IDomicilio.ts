import { ILocalidad } from './ILocalidad'
import { IPais } from './IPais'
import { IProvincia } from './IProvincia'

export interface IDomicilio {
  id?: number
  calle: string
  numero: number
  codigoPostal: number
  descripcion: string
  pais: IPais
  provincia: IProvincia
  localidad: ILocalidad
}
