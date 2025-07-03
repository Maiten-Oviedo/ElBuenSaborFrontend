export interface IDomicilio {
  id: number
  calle: string
  numero: number
  codigoPostal: string
  descripcion: string
  //relaciones
  pais: { id: number; nombre: string }
  provincia: { id: number; nombre: string }
  localidad: { id: number; nombre: string }
}
