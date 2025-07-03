import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Button from '../button/Button'
import { IEmpleado } from '@/common/types/entities/IEmpleado'
import httpClient from '@/common/lib/httpClient'
import { useEmpleadoStore } from '@/store/storeEmpleados'

interface Props {
    id: string
    deleteFunction: (id: number) => Promise<void>
}

export default function DeleteItemAlertEmpleado({
    id,
    deleteFunction,
}: Props) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [empleadoData, setEmpleadoData] = useState<IEmpleado | null>(null)
    const router = useRouter()

    const handleDelete = async () => {
        setError(null)
        setLoading(true)

        try {
            await deleteFunction(Number(id))
        } catch (error: unknown) {
            setError(
                `Error al eliminar el empleado. ${JSON.stringify(
                    (error as Error).message
                )}:${JSON.stringify((error as Error).cause)}`
            )
        } finally {
            setLoading(false)
            router.back()
        }
    }

    useEffect(() => {
        const getEmpleadoData = async () => {
            setError(null)
            setLoading(true)

            try {
                const { fetchEmpleadoById } = useEmpleadoStore.getState()
                const empleado = await fetchEmpleadoById(Number(id))
                if (empleado) {
                    setEmpleadoData(empleado)
                } else {
                    setError('Empleado no encontrado')
                }
            } catch (error: unknown) {
                setError(
                    `Error al traer los datos del empleado. ${JSON.stringify(
                        (error as Error).message
                    )}:${JSON.stringify((error as Error).cause)}`
                )
            } finally {
                setLoading(false)
            }
        }

        getEmpleadoData()
    }, [id])

    return (
        <article>
            <h2 className="text-white text-xl text-center">
                ¿Desea desactivar al empleado {empleadoData?.nombre + " " + empleadoData?.apellido}?
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
