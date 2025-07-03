import { useFormikContext, useField } from 'formik'
import { useEffect, useState } from 'react'

type Props = {
  esPromocion?: boolean
}

export default function PrecioOMargenGroup({esPromocion}: Props) {
  const [precioVentaField, precioVentaMeta, precioVentaHelpers] =
    useField('precioVenta')
  const [margenField, margenMeta, margenHelpers] = useField('margen')
  const { values } = useFormikContext<any>()

  const [campoElegido, setCampoElegido] = useState<
    'precioVenta' | 'margen' | null
  >(null)

  useEffect(() => {
    setCampoElegido(null)
  }, [])

  const handleFocus = (campo: 'precioVenta' | 'margen') => {
    if (!campoElegido) {
      setCampoElegido(campo)
    }
  }

  const handleBlur = (campo: 'precioVenta' | 'margen') => {
    const valor = values[campo]
    const isEmpty = valor === null || valor === '' || parseFloat(valor) === 0

    if (isEmpty) {
      setCampoElegido(null)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    campo: 'precioVenta' | 'margen'
  ) => {
    const value = e.target.value
    const setThis =
      campo === 'precioVenta'
        ? precioVentaHelpers.setValue
        : margenHelpers.setValue
    const clearOther =
      campo === 'precioVenta'
        ? margenHelpers.setValue
        : precioVentaHelpers.setValue

    // Actualizo valor actual
    setThis(value)

    // Limpio el otro
    if (value !== '') {
      clearOther('')
    }
  }

  const isPrecioVentaDisabled = campoElegido === 'margen'
  const isMargenDisabled = campoElegido === 'precioVenta'

  return (
    <div className="w-full col-span-2 flex flex-col gap-2 items-center outline-1 outline-gray-800 outline-offset-8 rounded-lg my-2">
      <p className="font-bold text-lg">Elige uno de los siguientes:</p>
      <div className="w-full flex gap-3">
        {/* PRECIO VENTA */}
        <div className="w-[50%]">
          <label htmlFor="precioVenta">Precio Venta</label>
          <input
            {...precioVentaField}
            id="precioVenta"
            type="number"
            value={values.precioVenta ?? ''}
            onFocus={() => handleFocus('precioVenta')}
            onBlur={e => {
              precioVentaField.onBlur(e)
              handleBlur('precioVenta')
            }}
            onChange={e => handleChange(e, 'precioVenta')}
            disabled={isPrecioVentaDisabled}
            className={`mb-4 rounded-full w-full px-4 py-2 text-black ${
              isPrecioVentaDisabled
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-white'
            } ${
              precioVentaMeta.touched && precioVentaMeta.error
                ? 'border-red-500 border-2'
                : 'border-gray-300'
            }`}
          />
          {precioVentaMeta.touched && precioVentaMeta.error && (
            <div className="text-red-500 font-semibold">
              {precioVentaMeta.error}
            </div>
          )}
        </div>

        <span className="font-bold h-full mt-8">ó</span>

        {/* MARGEN */}
        <div className="w-[50%]">
          <label htmlFor="margen">{esPromocion ? "Porcentaje de descuento" : "Márgen Ganancia"}</label>
          <input
            {...margenField}
            id="margen"
            type="number"
            value={values.margen ?? ''}
            onFocus={() => handleFocus('margen')}
            onBlur={e => {
              margenField.onBlur(e)
              handleBlur('margen')
            }}
            onChange={e => handleChange(e, 'margen')}
            disabled={isMargenDisabled}
            className={`mb-4 rounded-full w-full px-4 py-2 text-black ${
              isMargenDisabled ? 'cursor-not-allowed bg-gray-400' : 'bg-white'
            } ${
              margenMeta.touched && margenMeta.error
                ? 'border-red-500 border-2'
                : 'border-gray-300'
            }`}
          />
          {margenMeta.touched && margenMeta.error && (
            <div className="text-red-500 font-semibold">{margenMeta.error}</div>
          )}
        </div>
      </div>
    </div>
  )
}
