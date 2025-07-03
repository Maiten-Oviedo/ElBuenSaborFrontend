import { IImagenArticulo } from '@/common/types/entities/IImagenArticulo'
import { useState } from 'react'
import { useField, useFormikContext } from 'formik'

export default function ImagenesInputFormik({
  name,
  esEdicion,
}: {
  name: string
  esEdicion: boolean
}) {
  const [field, , helpers] = useField<IImagenArticulo[] | string[]>({ name })
  const { errors, touched } = useFormikContext<any>()
  const [inputUrl, setInputUrl] = useState('')
  const { setFieldTouched, validateField } = useFormikContext()
  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const agregarUrl = () => {
    const url = inputUrl.trim()
    if (!url) return
    if (!isValidUrl(url)) {
      alert('La URL no es válida')
      return
    }
    if (esEdicion) {
      const existentes = (field.value as IImagenArticulo[]).filter(
        i => typeof i === 'object' && typeof i.url === 'string'
      )

      const yaExiste = existentes.find(img => img.url === url)
      if (yaExiste) return

      helpers.setValue([...existentes, { id: null, url }])
    } else {
      const existentes = (field.value as string[]).filter(
        i => typeof i === 'string'
      )
      if (existentes.includes(url)) return

      helpers.setValue([...existentes, url])
    }

    setInputUrl('')
    setFieldTouched(name, true)
    validateField(name)
  }

  const eliminarUrl = (index: number) => {
    if (esEdicion) {
      const nuevas: IImagenArticulo[] = [...(field.value as IImagenArticulo[])]
      nuevas.splice(index, 1)
      helpers.setValue(nuevas)
    } else {
      const nuevas: string[] = [...(field.value as string[])]
      nuevas.splice(index, 1)
      helpers.setValue(nuevas)
    }

    setFieldTouched(name, true)
  }

  return (
    <div className="w-full">
      <label className="block mb-1 text-white">URLs de Imágenes</label>
      <div className="flex gap-2 w-full">
        <input
          type="url"
          placeholder="https://..."
          value={inputUrl}
          onChange={e => setInputUrl(e.target.value)}
          className="w-full rounded-full px-3 py-2 border border-gray-300"
        />
        <button
          type="button"
          onClick={agregarUrl}
          className="bg-green-800 text-xl text-white px-2 py-1 rounded-full cursor-pointer hover:bg-green-600"
        >
          +
        </button>
      </div>

      <ul className="mt-2 space-y-1">
        {field.value?.map((img, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white p-2 rounded max-w-[300px]"
          >
            <span className="text-black text-sm truncate w-4/5">
              {typeof img === 'string' ? img : img.url}
            </span>
            <button
              type="button"
              onClick={() => eliminarUrl(index)}
              className="text-red-600 hover:underline text-sm cursor-pointer"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      {touched[name] && errors[name] && (
        <p className="text-red-500 text-sm font-semibold mt-2">
          {errors[name]}
        </p>
      )}
    </div>
  )
}
