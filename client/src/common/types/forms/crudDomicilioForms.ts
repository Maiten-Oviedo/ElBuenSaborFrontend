import { ILocalidad } from '../entitites/ILocalidad'
import { IPais } from '../entitites/IPais'
import { IProvincia } from '../entitites/IProvincia'
import { FormField } from '../MyFormProps'

export type DomicilioValues = {
  pais?: number | ''
  provincia?: number | ''
  localidad: number | ''
  codigoPostal: string
  calle: string
  numero: number
  descripcion?: string | null
}

export const domicilioInitialValues: DomicilioValues = {
  pais: '',
  provincia: '',
  localidad: '',
  codigoPostal: '',
  calle: '',
  numero: 0,
  descripcion: '',
}

export const getDomicilioFormFields = (
  paises: IPais[],
  provincias: IProvincia[],
  localidades: ILocalidad[],
  onChangePais?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  onChangeProvincia?: (e: React.ChangeEvent<HTMLSelectElement>) => void
): FormField[] => [
  {
    label: 'País',
    name: 'pais',
    type: 'select',
    options: paises.map(pais => ({
      label: pais.nombre,
      value: pais.id!,
    })),
    onChange: onChangePais,
  },
  {
    label: 'Provincia',
    name: 'provincia',
    type: 'select',
    options: provincias.map(provincia => ({
      label: provincia.nombre,
      value: provincia.id!,
    })),
    onChange: onChangeProvincia,
  },
  {
    label: 'Localidad',
    name: 'localidad',
    type: 'select',
    options: localidades.map(localidad => ({
      label: localidad.nombre,
      value: localidad.id!,
    })),
  },
  { label: 'Código Postal', name: 'codigoPostal', type: 'text' },
  { label: 'Calle', name: 'calle', type: 'text' },
  { label: 'Número', name: 'numero', type: 'number' },
  { label: 'Descripción (opcional)', name: 'descripcion', type: 'text' },
]
