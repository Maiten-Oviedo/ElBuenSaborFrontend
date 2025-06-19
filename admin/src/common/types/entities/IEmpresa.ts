export interface IEmpresa {
  id: number
  nombre: string
  razonSocial: string
  cuil: number
  //relaciones
  listaSucursales?: ISucursal[]
}
