'use client'
import httpClient from '@/common/lib/httpClient'
import { useAuthStore } from '@/common/store/useAuthStore'
import { useReloadStore } from '@/common/store/useReloadStore'
import { ICliente } from '@/common/types/entitites/ICliente'
import { IDomicilio } from '@/common/types/entitites/IDomicilio'
import { DireccionCard } from '@/features/profile/DireccionCard'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import { RxReload } from 'react-icons/rx'

const MisDomicilios = () => {
  const reloadFlag = useReloadStore(state => state.reloadFlag)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const cliente = useAuthStore(state => state.cliente) as ICliente
  const [direcciones, setDirecciones] = useState<IDomicilio[]>([])

  const toggleReload = useReloadStore(state => state.toggleReload)
  const handleReload = () => toggleReload()

  useEffect(() => {
    const fetchDirecciones = async () => {
      try {
        setError(null)
        setLoading(true)

        if (!cliente || !cliente.id) {
          setError('Cliente no autenticado.')
          return
        }

        const response = (await httpClient().get(
          `http://localhost:8080/cliente/${cliente.id}/domicilios`
        )) as IDomicilio[]

        //Se ordena alfabéticamente por calle y número
        const direccionesOrdenadas = response.sort((a, b) => {
          const dirA = `${a.calle} ${a.numero}`.toLowerCase()
          const dirB = `${b.calle} ${b.numero}`.toLowerCase()
          return dirA.localeCompare(dirB)
        })

        setDirecciones(direccionesOrdenadas)
      } catch (e: unknown) {
        setError((e as Error).message)
      } finally {
        setLoading(false)
      }
    }

    fetchDirecciones()
  }, [reloadFlag])

  return (
    <div className="bg-black max-h-[74vh] rounded-3xl flex flex-col items-center justify-start gap-8 p-12">
      <nav className="flex flex-row gap-4 items-center justify-center">
        <h1 className="text-white text-5xl montserrat font-black">
          MIS DIRECCIONES
        </h1>
        <button onClick={handleReload} className="cursor-pointer ">
          <RxReload color="white" size={30} className="hover:scale-105" />
        </button>
      </nav>
      {loading && <p>Cargando tus direcciones...</p>}
      {!loading && error && (
        <p className="text-red">Error al cargar tus direcciones. {error}</p>
      )}

      {!loading && !error && direcciones.length === 0 && (
        <>
          <article className="flex flex-col justify-center items-center w-full h-full gap-2">
            <p className="text-2xl text-center w-full text-red font-semibold">
              No tienes una dirección asociada a tu cuenta.
            </p>
          </article>
        </>
      )}

      {direcciones.length > 0 && (
        <article className="flex flex-col w-[80%] py-2 space-y-4 overflow-y-auto">
          {direcciones.map(direccion => (
            <DireccionCard key={direccion.id} direccion={direccion} />
          ))}
        </article>
      )}
      <div className="w-full h-16 flex justify-center items-center">
        <Link
          href="/profile/direcciones/crear"
          className="w-16 h-16 flex items-center justify-center bg-red rounded-full text-white text-4xl font-black cursor-pointer hover:scale-110 hover:bg-red-500 transition-all duration-200"
        >
          <BiPlus size={40} />
        </Link>
      </div>
    </div>
  )
}

export default MisDomicilios
