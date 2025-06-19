import { IImagenArticulo } from '@/common/types/entities/IImagenArticulo'
import { useEffect, useState } from 'react'
import { useField, useFormikContext } from 'formik'

export default function ImagenesInputFormik({ name }: { name: string }) {
  const [field, , helpers] = useField<IImagenArticulo[] | string[]>({ name })
  const [inputUrl, setInputUrl] = useState('')
  const { setFieldTouched, validateField } = useFormikContext()
  const [esEdicion, setEsEdicion] = useState(false)

  useEffect(() => {
    // Detecta si el primer valor ya tiene un objeto con `id` → es edición
    if (field.value && Array.isArray(field.value)) {
      if (typeof field.value[0] === 'object' && 'id' in field.value[0]) {
        setEsEdicion(true)
      }
    }
  }, [field.value])

  const agregarUrl = () => {
    const url = inputUrl.trim()
    if (!url) return

    if (esEdicion) {
      const nuevas: IImagenArticulo[] = [
        ...(field.value as IImagenArticulo[]),
        { id: null, url },
      ]
      helpers.setValue(nuevas)
    } else {
      const nuevas: string[] = [...(field.value as string[]), url]
      helpers.setValue(nuevas)
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

  const { errors, touched } = useFormikContext<any>()
  console.log(errors)

  return (
    <div>
      <label className="block mb-1 text-white">URLs de Imágenes</label>
      <div className="flex gap-2">
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
          className="bg-blue-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-600"
        >
          Agregar
        </button>
      </div>

      <ul className="mt-2 space-y-1">
        {field.value?.map((img, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white p-2 rounded"
          >
            <span className="text-black text-sm truncate w-4/5">
              {typeof img === 'string' ? img : img.url}
            </span>
            <button
              type="button"
              onClick={() => eliminarUrl(index)}
              className="text-red-600 hover:underline text-sm"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
