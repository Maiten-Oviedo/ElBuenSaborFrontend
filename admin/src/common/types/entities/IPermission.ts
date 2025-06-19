export interface IPermission {
  id: number
  permissionEnum: 'CREATE' | 'UPDATE' | 'DELETE'
  //relaciones
  idRole: number
}
