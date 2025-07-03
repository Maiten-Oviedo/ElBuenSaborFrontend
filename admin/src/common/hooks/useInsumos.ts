import httpClient from '@/common/lib/httpClient'
import { IArticuloInsumo } from '@/common/types/entities/IArticuloInsumo'
import { useStoreInsumos } from '@/store/storeInsumos'
import { useShallow } from 'zustand/shallow'

export const useInsumos = () => {
  const {
    data,
    setData,
    createInsumo,
    updateInsumo,
    deleteInsumo,
    reactivateInsumo,
  } = useStoreInsumos(
    useShallow(state => ({
      data: state.data,
      setData: state.setData,
      createInsumo: state.createInsumo,
      updateInsumo: state.updateInsumo,
      deleteInsumo: state.deleteInsumo,
      comprarInsumo: state.comprarInsumo,
      reactivateInsumo: state.reactivateInsumo,
    }))
  )

  const getInsumos = async () => {
    try {
      const response = await httpClient().get(
        'http://localhost:8080/articulo-insumo/getAll'
      )
      //Si la petición sale bien, se agregan los datos traidos al estado de Data
      setData(response as IArticuloInsumo[])
    } catch (error: unknown) {
      //Si la petición sale mal, se tira un error para que lo reciba el componente
      let errorMessage = 'Error desconocido'

      if (error instanceof Error) {
        errorMessage = error.message
      }
      throw new Error(errorMessage)
    }
  }

  const postInsumo = async (newInsumo: IArticuloInsumo) => {
    try {
      const response = (await httpClient().post(
        'http://localhost:8080/articulo-insumo',
        {
          body: JSON.stringify(newInsumo),
        }
      )) as IArticuloInsumo
      createInsumo(response)
    } catch (error: unknown) {
      throw error
    }
  }

  const putInsumo = async (updatedInsumo: IArticuloInsumo) => {
    //Guardamos el insumo sin editar para tenerlo como backup
    const estadoPrevio: IArticuloInsumo | undefined = data.find(
      insumo => insumo.id === updatedInsumo.id
    )
    //Optimistic update
    updateInsumo(updatedInsumo)

    try {
      await httpClient().put(
        `http://localhost:8080/articulo-insumo/${updatedInsumo.id}`,
        {
          body: JSON.stringify(updatedInsumo),
        }
      )
    } catch (error: unknown) {
      //Si la petición sale mal, se revierte lo que hicimos con el estado, chequeando que estadoPrevio no sea undefined
      if (estadoPrevio) {
        updateInsumo(estadoPrevio)
      }
      throw error
    }
  }

  const deleteInsumoById = async (id: number) => {
    try {
      await httpClient().del(`http://localhost:8080/articulo-insumo/${id}`)
      //Optimistic update
      deleteInsumo(id)
    } catch (error) {
      //Si la petición sale mal, se revierte lo que hicimos con el estado, chequeando que estadoPrevio no sea undefined
      reactivateInsumo(id)

      //Luego se devuelve error
      let errorMessage = 'Error desconocido'

      if (error instanceof Error) {
        errorMessage = error.message
      }
      throw new Error(errorMessage)
    }
  }

  const patchInsumo = async (
    id: number,
    stockActual: number,
    nuevoStock: number,
    precioCompra: number
  ) => {
    const stockActualizado = stockActual + nuevoStock

    const body = {
      precioCosto: precioCompra,
      stockActual: stockActualizado,
    }

    try {
      const data = await httpClient().patch(
        `http://localhost:8080/articulo-insumo/${id}/precio-stock`,
        {
          body: JSON.stringify(body),
        }
      )

      alert('Producto actualizado correctamente')
    } catch (error) {
      console.error('Error en la petición PATCH:', error)
    }
  }

  return {
    data,
    getInsumos,
    postInsumo,
    putInsumo,
    deleteInsumoById,
    patchInsumo,
  }
}
