import { IPersona } from "./IPersona";

export interface IEmpleado extends IPersona {
  //relaciones
  idSucursal: number
}
