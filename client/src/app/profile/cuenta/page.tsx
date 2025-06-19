'use client'
import Button from '@/common/components/ui/Button'
import Input from '@/common/components/ui/forms/Input'
import { useAuthStore } from '@/common/store/useAuthStore'
import { useReloadStore } from '@/common/store/useReloadStore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { RxReload } from 'react-icons/rx'

type ClienteInputsDataType = {
  nombre: string
  apellido: string
  email: string
  telefono: string
}

const Cuenta = () => {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const cliente = useAuthStore(state => state.cliente)

  const [initialValues, setInitialValues] = useState<ClienteInputsDataType>({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
  })

  const toggleReload = useReloadStore(state => state.toggleReload)
  const handleReload = () => toggleReload()

  useEffect(() => {
    if (cliente) {
      setInitialValues({
        nombre: cliente.nombre,
        apellido: cliente.apellido,
        email: cliente.email,
        telefono: cliente.telefono || '-',
      })
    }
  }, [cliente])

  return (
    <div className="bg-black max-h-[74vh] rounded-3xl flex flex-col items-center justify-start gap-8 p-12">
      <nav className="flex flex-row gap-4 items-center justify-center">
        <h1 className="text-white text-5xl montserrat font-black">MI CUENTA</h1>
        <button onClick={handleReload} className="cursor-pointer ">
          <RxReload color="white" size={30} className="hover:scale-105" />
        </button>
      </nav>

      {loading && <p>Cargando tus datos...</p>}
      {!loading && error && (
        <p className="text-red">Error al cargar tus datos. {error}</p>
      )}

      {!loading && cliente && (
        <div className="flex flex-col justify-center items-center gap-10">
          <div className="relative group w-[110px] h-[110px]">
            <Image
              src={
                cliente.imagen
                  ? cliente.imagen
                  : '/images/cliente/noimage-client.webp'
              }
              alt="icono"
              width={110}
              height={110}
              className="rounded-full object-cover transition duration-300 group-hover:brightness-110 outline-2 outline-offset-5 outline-white"
            />
            <Link
              href={`/profile/cuenta/editar-imagen/${cliente?.id}`}
              className="absolute inset-0 bg-gray-900/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"
            >
              <p className="text-white text-sm font-semibold text-center">
                CAMBIAR IMAGEN
              </p>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-10 gap-x-20">
            {Object.entries(initialValues).map(([key, value]) => (
              <div key={key} className="flex flex-col gap-1">
                <p className="text-white font-bold">
                  {key.toUpperCase() === 'NOMBRE'
                    ? 'NOMBRE/S'
                    : key.toUpperCase() === 'APELLIDO'
                    ? 'APELLIDO/S'
                    : key.toUpperCase() === 'EMAIL'
                    ? 'EMAIL'
                    : 'TELÉFONO'}
                </p>
                <Input
                  key={key}
                  value={value}
                  readOnly={true}
                  whiteText={true}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="w-full h-16 flex justify-center items-center">
        <Button
          variant="primary"
          href={`/profile/cuenta/editar/${cliente?.id}`}
        >
          Editar
        </Button>
      </div>
    </div>
  )
}

export default Cuenta
