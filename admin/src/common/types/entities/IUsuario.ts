import { IRole } from './IRole'

export interface IUsuario {
  id: number
  username: string
  email: string
  password: string

  //atributos usuario oauth2??
  //

  //relaciones
  idRol: IRole
}
