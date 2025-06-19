import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Button from '../button/Button'
import httpClient from '@/common/lib/httpClient'
import { IArticuloManufacturado } from '@/common/types/entities/IArticuloManufacturado'

interface Props {
  id: string
  endpoint: string
  deleteFunction: (id: number) => Promise<void>
}

export default function DeleteItemAlert({
  id,
  endpoint,
  deleteFunction,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [itemData, setItemData] = useState<IArticuloManufacturado>()
  const router = useRouter()

  const handleDelete = async () => {
    setError(null)
    setLoading(true)

    try {
      await deleteFunction(Number(id))
    } catch (error: unknown) {
      setError(
        `Error al eliminar el item. ${JSON.stringify(
          (error as Error).message
        )}:${JSON.stringify((error as Error).cause)}`
      )
    } finally {
      setLoading(false)
      router.back()
    }
  }

  useEffect(() => {
    const getItemData = async () => {
      setError(null)
      setLoading(true)

      try {
        const response = await httpClient().get(
          `http://localhost:8080/${endpoint}/get/${id}`
        )

        if (response) {
          setItemData(response as IArticuloManufacturado)
        } else if (response.message === 'No content') {
          throw Error('No hay contenido')
        }
      } catch (error: unknown) {
        setError(
          `Error al traer los datos del item. ${JSON.stringify(
            (error as Error).message
          )}:${JSON.stringify((error as Error).cause)}`
        )
      } finally {
        setLoading(false)
      }
    }

    getItemData()
  }, [id])

  return (
    <article>
      <h2 className="text-white text-xl text-center">
        ¿Desea eliminar el item {itemData?.denominacion}?
      </h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <nav className="w-full flex justify-around items-center gap-2">
        {!loading && (
          <Button
            onClick={() => router.back()}
            className="bg-white text-red hover:bg-red hover:text-white"
          >
            Cancelar
          </Button>
        )}
        <Button
          onClick={handleDelete}
          className="bg-red text-white hover:bg-white hover:text-red"
        >
          {loading ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </nav>
    </article>
  )
}
