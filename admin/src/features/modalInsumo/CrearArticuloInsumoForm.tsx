import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import CategoriaSelectorFormik from './CategoriaSelectorFormik'
import {
  UnidadMedidaEnum,
  unidadMedidaEnumArray,
} from '@/common/lib/unidadMedida'
import Button from '@/common/components/button/Button'
import ImagenesInputFormik from './ImagenesInputFormik'
import { IArticuloInsumo } from '@/common/types/entities/IArticuloInsumo'

const initialDefaultValues: IArticuloInsumo = {
  denominacion: '',
  precioVenta: 0,
  productoActivo: false,
  imagenesUrls: [],
  categoriaId: 2,
  precioCosto: 0,
  unidadMedidaEnum: '',
  stockActual: 0,
  stockMaximo: 0,
  stockMinimo: 0,
  esParaPreparar: false,
  esVendible: false,
  tiempoEstimadoMinutos: 0,
  categoriaDenominacion: '',
}

const validationCrearInsumoSchema = Yup.object<IArticuloInsumo>({
  denominacion: Yup.string().required('La denominación es requerida'),
  precioVenta: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser un número positivo')
    .required('El precio de venta es requerido'),
  productoActivo: Yup.boolean(),

  imagenesUrls: Yup.array()
    .of(
      Yup.lazy(value =>
        typeof value === 'string'
          ? Yup.string()
              .url('Debe ser una URL válida')
              .required('La URL es requerida')
          : Yup.object({
              id: Yup.number().nullable().optional(),
              url: Yup.string()
                .url('Debe ser una URL válida')
                .required('La URL de la imagen es requerida'),
            }).required('La imagen es requerida')
      )
    )
    .required('Debe tener al menos una imagen'),

  categoriaId: Yup.number()
    .typeError('Debe seleccionar una categoría')
    .required('Debe seleccionar una categoría'),

  precioCosto: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser un número positivo')
    .required('El precio de costo es requerido'),

  unidadMedidaEnum: Yup.mixed<UnidadMedidaEnum>()
    .oneOf(unidadMedidaEnumArray, 'Debe seleccionar una unidad válida')
    .required('La unidad de medida es requerida'),

  stockActual: Yup.number()
    .typeError('Debe ser un número')
    .min(1, 'Debe ser al menos 1')
    .required('El stock actual es requerido'),

  stockMaximo: Yup.number()
    .typeError('Debe ser un número')
    .min(1, 'Debe ser al menos 1')
    .required('El stock máximo es requerido'),

  stockMinimo: Yup.number()
    .typeError('Debe ser un número')
    .min(1, 'Debe ser al menos 1')
    .required('El stock mínimo es requerido'),

  esParaPreparar: Yup.boolean(),
  esVendible: Yup.boolean(),

  tiempoEstimadoMinutos: Yup.number()
    .typeError('Debe ser un número')
    .min(1, 'Debe ser al menos 1 minuto')
    .required('El tiempo estimado es requerido'),
})

interface Props {
  onSubmit: (values: IArticuloInsumo) => Promise<void>
  loading: boolean
  error: string | null
  initialValues?: IArticuloInsumo
}

export default function CrearArticuloInsumoForm({
  onSubmit,
  error,
  loading,
  initialValues,
}: Props) {
  console.log('INITIAL VALUES:', initialValues)
  return (
    <div className="max-w-3xl mx-auto p-4">
      <Formik
        initialValues={initialValues ? initialValues : initialDefaultValues}
        validationSchema={validationCrearInsumoSchema}
        onSubmit={values => {
          console.log(values)
          onSubmit(values)
        }}
      >
        {({ errors }) => (
          <Form className="space-y-4">
            <div>
              {initialValues?.categoriaDenominacion && (
                <p className="text-white  text-lg">
                  Rubro Actual:{' '}
                  <span className="text-orange font-bold">
                    {initialValues.categoriaDenominacion}
                  </span>
                </p>
              )}
              <CategoriaSelectorFormik name="categoriaId" />
              <ErrorMessage
                name="categoriaId"
                component="div"
                className="text-red-500 font-semibold"
              />
            </div>
            <div>
              <ImagenesInputFormik name="imagenesUrls" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="denominacion">Denominación</label>
                <Field
                  name="denominacion"
                  placeholder="Lacteos..."
                  className={`mb-4 rounded-full w-full px-4  py-2 bg-white text-black ${
                    errors.denominacion
                      ? 'border-red-500 border-2'
                      : 'border-gray-300'
                  }`}
                />
                <ErrorMessage
                  name="denominacion"
                  component="div"
                  className="text-red-500 font-semibold"
                />
              </div>

              <div>
                <label htmlFor="precioVenta">Precio Venta</label>
                <Field
                  type="number"
                  name="precioVenta"
                  className={`mb-4 rounded-full w-full px-4  py-2 bg-white text-black ${
                    errors.precioVenta
                      ? 'border-red-500 border-2'
                      : 'border-gray-300'
                  }`}
                />
                <ErrorMessage
                  name="precioVenta"
                  component="div"
                  className="text-red-500 font-semibold"
                />
              </div>

              <div>
                <label htmlFor="precioCosto">Precio Costo</label>
                <Field
                  type="number"
                  name="precioCosto"
                  className={`mb-4 rounded-full w-full px-4  py-2 bg-white text-black ${
                    errors.precioCosto
                      ? 'border-red-500 border-2'
                      : 'border-gray-300'
                  }`}
                />
                <ErrorMessage
                  name="precioCosto"
                  component="div"
                  className="text-red-500 font-semibold"
                />
              </div>
              <div>
                <label htmlFor="tiempoEstimadoMinutos">
                  Tiempo estimado (minutos)
                </label>
                <Field
                  type="number"
                  name="tiempoEstimadoMinutos"
                  className="rounded-full w-full px-4 py-2 bg-white text-black border-gray-300"
                />
                <ErrorMessage
                  name="tiempoEstimadoMinutos"
                  component="div"
                  className="text-red-500 font-semibold"
                />
              </div>

              <div>
                <label htmlFor="unidadMedidaEnum">Unidad de Medida</label>
                <Field
                  as="select"
                  name="unidadMedidaEnum"
                  className={`mb-4 rounded-full w-full px-4  py-2 bg-white text-black ${
                    errors.unidadMedidaEnum
                      ? 'border-red-500 border-2'
                      : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar...</option>
                  {unidadMedidaEnumArray.map(um => (
                    <option key={um} value={um}>
                      {um}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="unidadMedidaEnum"
                  component="div"
                  className="text-red-500 font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1">
                <label htmlFor="stockActual">Stock Actual</label>
                <Field
                  type="number"
                  name="stockActual"
                  className={`rounded-full w-full px-4  py-2 bg-white text-black ${
                    errors.stockActual
                      ? 'border-red-500 border-2'
                      : 'border-gray-300'
                  }`}
                />
                <ErrorMessage
                  name="stockActual"
                  component="div"
                  className="text-red-500 font-semibold"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="stockMaximo">Stock Máximo</label>
                <Field
                  type="number"
                  name="stockMaximo"
                  className={`rounded-full w-full px-4  py-2 bg-white text-black ${
                    errors.stockMaximo
                      ? 'border-red-500 border-2'
                      : 'border-gray-300'
                  }`}
                />
                <ErrorMessage
                  name="stockMaximo"
                  component="div"
                  className="text-red-500 font-semibold"
                />
              </div>
              <div className="col-span-1">
                <label htmlFor="stockMinimo">Stock Mínimo</label>
                <Field
                  type="number"
                  name="stockMinimo"
                  className={`rounded-full w-full px-4  py-2 bg-white text-black ${
                    errors.stockMinimo
                      ? 'border-red-500 border-2'
                      : 'border-gray-300'
                  }`}
                />
                <ErrorMessage
                  name="stockMinimo"
                  component="div"
                  className="text-red-500 font-semibold"
                />
              </div>
            </div>

            <div className="flex items-center gap-4 justify-between">
              <label className="flex items-center gap-1">
                <Field
                  type="checkbox"
                  name="productoActivo"
                  className="size-5"
                />{' '}
                Producto Activo
              </label>
              <label className="flex items-center gap-1">
                <Field
                  type="checkbox"
                  name="esParaPreparar"
                  className="size-5"
                />{' '}
                ¿Para preparar?
              </label>
              <label className="flex items-center gap-1">
                <Field type="checkbox" name="esVendible" className="size-5" />{' '}
                ¿Es vendible?
              </label>
            </div>
            {error && <p className="text-red-500 font-semibold">{error} </p>}
            <article className="w-full flex justify-center">
              <Button type="submit" className="self-center">
                {loading
                  ? initialValues
                    ? 'Editando...'
                    : 'Creando...'
                  : initialValues
                  ? 'Editar Insumo'
                  : 'Crear Insumo'}
              </Button>
            </article>
          </Form>
        )}
      </Formik>
    </div>
  )
}
