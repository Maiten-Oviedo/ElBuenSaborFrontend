import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Button from '../button/Button'
import httpClient from '@/common/lib/httpClient'
import { IArticuloManufacturado } from '@/common/types/entities/IArticuloManufacturado'

interface Props {
  id: string
  endpoint?: string
  deleteFunction: (id: number) => void
}

interface IBasicItem {
  id: number
  nombre?: string
  denominacion?: string
}

export default function DeleteItemAlert({
  id,
  endpoint,
  deleteFunction,
}: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [itemData, setItemData] = useState<IBasicItem>()
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
          `http://localhost:8080/${endpoint}/${id}`
        )

        if (response) {
          setItemData(response as IBasicItem)
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
  }, [id, endpoint])

  return (
    <article>
      <h2 className="text-white text-xl text-center">
        ¿Desea desactivar el item{' '}
        {itemData?.denominacion ?? itemData?.nombre ?? itemData?.id ?? ''}?
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
          {loading ? 'Eliminando...' : 'Aceptar'}
        </Button>
      </nav>
    </article>
  )
}
