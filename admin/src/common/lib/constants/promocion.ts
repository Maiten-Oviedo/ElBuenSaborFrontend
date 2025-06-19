import type { ICategoria } from '@/common/types/entities/ICategoria'
import type { FormField } from '@/common/types/form.types'
import { ITableColumn } from '@/common/types/generic table/IGenericTableProps'

/** Paso 1 - Datos básicos */
export const initialValuesStepOnePromocion = {
  denominacion: '',
  descripcion: '',
  imagenesUrls: '',
  productoActivo: false,
}

/** Paso 2 - Selección de productos */
export const initialValuesStepTwoPromocion = {
  productosSeleccionados: [],
}

/** Paso 3 - Precio y duración de la promoción */
export const initialValuesStepThreePromocion = {
  precioPromocional: 0,
  fechaDesde: new Date(),
  fechaHasta: new Date(),
  horaDesde: new Date(new Date().setHours(8, 0, 0, 0)),
  horaHasta: new Date(new Date().setHours(23, 59, 0, 0)),
}

export const promocionFieldsStepOne: FormField[] = [
  {
    name: 'denominacion',
    label: 'Denominacion',
    type: 'text',
  },
  {
    name: 'descripcionDescuento',
    label: 'Descripción',
    type: 'text',
  },
  {
    name: 'imagenesUrls',
    label: 'URL de imagen',
    type: 'text',
  },
  {
    name: 'productoActivo',
    label: 'Estado',
    type: 'select',
    options: [
      { label: 'Activo', value: "true" },
      { label: 'Inactivo', value: "false" },
    ],
  },
  {
    name: 'categoriaId',
    label: 'Categoria',
    type: 'select',
    options: [
      { label: 'Combos', value: 17 },
      { label: 'Subcategoria Combo Individual', value: 18 },
      { label: 'Subcategoria Combo Familiar', value: 19 },
    ],
  },
]

export const promocionFieldsStepThree: FormField[] = [
  {
    name: 'precioPromocional',
    label: 'Precio promocional ($)',
    type: 'number',
    placeholder: 'Ej: 3499.99',
  },
  {
    name: 'fechaDesde',
    label: 'Fecha de inicio',
    type: 'date',
  },
  {
    name: 'fechaHasta',
    label: 'Fecha de fin',
    type: 'date',
  },
]

