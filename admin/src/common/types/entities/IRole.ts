import { IPermission } from './IPermission'

export interface IRole {
  id: number
  rolEnum: 'ADMIN' | 'EMPLEADO' | 'CLIENTE'

  //relaciones
  permisos: IPermission[]
}
