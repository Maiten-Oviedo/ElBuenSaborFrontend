import { IPais } from "./IPais"

export interface IProvincia {
  id: number
  nombre: string
  //relaciones
  pais: IPais
}
