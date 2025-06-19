export interface IPersona {
  id: number
  nombre: string
  apellido: string
  telefono: number
  email: string

  //relaciones
  idUsuario: number
}
