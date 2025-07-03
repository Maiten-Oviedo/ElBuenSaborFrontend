import type { ICategoria } from '@/common/types/entities/ICategoria'
import type { FormField } from '@/common/types/form.types'
import { ITableColumn } from '@/common/types/generic table/IGenericTableProps'

export const initialValuesStepOne = {
  categoriaId: 1,
}

export const initialValuesStepTwo = {
  denominacion: '',
  productoActivo: false,
  imagenesUrls: [],
  descripcion: '',
  esVendible: true,
}

export const initialValuesStepThree = {
  articuloManufacturadoDetalle: [],
}

export const initialValuesStepFour = {
  precioCosto: 0,
  precioVenta: 0,
  tiempoEstimadoMinutos: 0,
  margen: null,
}

export const getManufacturadoFieldsStepOne = (
  categorias: ICategoria[]
): FormField[] => [
  {
    name: 'categoriaId',
    label: 'Rubro',
    type: 'select',
    options: categorias.map(categoria => ({
      label: categoria.denominacion,
      value: categoria.id!,
    })),
  },
]

export const manufacturadoFieldsStepTwo: FormField[] = [
  { name: 'denominacion', label: 'Nombre', type: 'text' },
  { name: 'descripcion', label: 'Descripción', type: 'text' },
  { name: 'productoActivo', label: 'Estado', type: 'checkbox' },
  { name: 'esVendible', label: '¿Es Vendible?', type: 'checkbox' },
]

export const getManufacturadoFieldsStepFour = (): FormField[] => [
  {
    name: 'tiempoEstimadoMinutos',
    label: 'Tiempo Mínimo Estimado (min)',
    type: 'number',
  },
]

// CREAR RUBRO
export const initialValuesCrearRubro = {
  denominacion: '',
  categoriaPadre: null as number | null | undefined, // Cambiar aquí para incluir undefined
}

export const crearRubroFields: FormField[] = [
  {
    name: 'denominacion',
    label: 'Nombre',
    type: 'text',
    placeholder: 'Mi nuevo Rubro',
  },
]

// EDITAR RUBRO
export const getInitialValuesEditarRubro = (categoria: ICategoria) => ({
  denominacion: categoria.denominacion || '',
  categoriaPadre: categoria.categoriaPadre || null,
})

export const manufacturadosRubroTableColumns: ITableColumn<ICategoria>[] = [
  { label: 'id', key: 'id' },
  { label: 'Nombre', key: 'denominacion' },
  { label: 'Rubro Padre', key: 'categoriaPadreDenominacion' },
  { label: 'Acciones', key: 'acciones' },
]
