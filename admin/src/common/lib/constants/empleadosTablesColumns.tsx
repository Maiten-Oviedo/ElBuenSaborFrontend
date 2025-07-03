import { IEmpleado } from '@/common/types/entities/IEmpleado'

// =========== COLUMNAS DE MOVIMIENTOS =========== //
export const rolesTableColumns = [
  { label: 'id', key: 'id' },
  { label: 'Nombre', key: 'rolName' },
]

export const empleadosTableColumns = [
  { label: 'id', key: 'id' },
  { label: 'nombre', key: 'nombre' },
  { label: 'apellido', key: 'apellido' },
  { label: 'telefono', key: 'telefono' },
  { label: 'email', key: 'email' },
  {
    label: 'rol',
    key: 'rol',
    render: (empleado: IEmpleado) => empleado.rol.rolName || 'Sin rol',
  },
  {
    key: 'activo',
    label: 'Estado',
    type: 'select',
    options: [
      { label: 'Activo', value: 'true' },
      { label: 'Inactivo', value: 'false' },
    ],
  },
  { label: 'acciones', key: 'acciones' },
]
