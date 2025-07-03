import httpClient from '@/common/lib/httpClient'
import { useStoreClientes } from '@/store/storeClientes'
import { useShallow } from 'zustand/shallow'
import { ICliente } from '../types/entities/ICliente'

export type ClientEditableFieldsType = {
  nombre: string
  apellido: string
  telefono: string
  activo: boolean
}

export const useClientes = () => {
  const { data, setData, reactivateCliente, updateCliente, deleteCliente } =
    useStoreClientes(
      useShallow(state => ({
        data: state.data,
        setData: state.setData,
        reactivateCliente: state.reactivate,
        updateCliente: state.update,
        deleteCliente: state.delete,
      }))
    )

  const getClientes = async () => {
    try {
      const response = await httpClient().get(
        'http://localhost:8080/cliente/getAll'
      )
      //Si la petición sale bien, se agregan los datos traidos al estado de Data
      setData(response as ICliente[])
    } catch (error: unknown) {
      //Si la petición sale mal, se tira un error para que lo reciba el componente
      let errorMessage = 'Error desconocido'

      if (error instanceof Error) {
        errorMessage = error.message
      }
      throw new Error(errorMessage)
    }
  }

  const putCliente = async (
    id: number,
    updatedCliente: ClientEditableFieldsType
  ) => {
    const estadoPrevio = data.find(cliente => cliente.id === id)
    if (!estadoPrevio) throw new Error('Cliente no encontrado')

    // Optimistic update (con nombre/apellido/telefono)
    updateCliente({ ...estadoPrevio, ...updatedCliente })

    try {
      await httpClient().put(`http://localhost:8080/cliente/complete/${id}`, {
        body: JSON.stringify(updatedCliente),
      })
    } catch (error) {
      if (estadoPrevio) {
        updateCliente(estadoPrevio)
      }

      let errorMessage = 'Error desconocido'
      if (error instanceof Error) errorMessage = error.message
      throw new Error(errorMessage)
    }
  }

  const deleteClienteById = async (id: number) => {
    try {
      await httpClient().del(`http://localhost:8080/cliente/${id}`)
      //Optimistic update
      deleteCliente(id)
    } catch (error) {
      //Si la petición sale mal, se revierte lo que hicimos con el estado, chequeando que estadoPrevio no sea undefined
      reactivateCliente(id)

      //Luego se devuelve error
      let errorMessage = 'Error desconocido'

      if (error instanceof Error) {
        errorMessage = error.message
      }
      throw new Error(errorMessage)
    }
  }

  return {
    data,
    getClientes,
    putCliente,
    deleteClienteById,
  }
}
