import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import httpClient from '@/common/lib/httpClient'
import Button from './Button'
import { useReloadStore } from '@/common/store/useReloadStore'

interface Props {
  id: string
  endpoint: string
  labelForElement: string
}

const DeleteItemAlert = ({ id, endpoint, labelForElement }: Props) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [itemData, setItemData] = useState<any>()
  const router = useRouter()
  const toggleReload = useReloadStore(state => state.toggleReload)

  const handleDelete = async () => {
    setError(null)
    setLoading(true)

    try {
      await httpClient().del(`http://localhost:8080/${endpoint}/${id}`)
    } catch (error: unknown) {
      setError(
        `Error al eliminar el item. ${JSON.stringify(
          (error as Error).message
        )}:${JSON.stringify((error as Error).cause)}`
      )
    } finally {
      setLoading(false)
      toggleReload()
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
          setItemData(response)
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
        ¿Desea eliminar el item {itemData ? itemData[labelForElement] : '...'}?
      </h2>
      <p className="text-sm text-center">Esta acción no se puede deshacer.</p>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <nav className="w-full flex justify-around items-center gap-2">
        {!loading && (
          <Button onClick={() => router.back()} variant="secondary">
            Cancelar
          </Button>
        )}
        <Button onClick={handleDelete} variant="primary">
          {loading ? 'Eliminando...' : 'Eliminar'}
        </Button>
      </nav>
    </article>
  )
}

export default DeleteItemAlert
