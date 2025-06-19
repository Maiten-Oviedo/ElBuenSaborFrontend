import httpClient from '@/common/lib/httpClient'
import { IArticuloInsumo } from '@/common/types/entities/IArticuloInsumo'
import { useStoreInsumos } from '@/store/storeInsumos'
import { useShallow } from 'zustand/shallow'

export const useInsumos = () => {
  const { data, setData, createInsumo, updateInsumo, deleteInsumo } =
    useStoreInsumos(
      useShallow(state => ({
        data: state.data,
        setData: state.setData,
        createInsumo: state.createInsumo,
        updateInsumo: state.updateInsumo,
        deleteInsumo: state.deleteInsumo,
        comprarInsumo: state.comprarInsumo,
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
    //Esto se llama optimistic update:
    //Se agrega al estado de zustand el insumo nuevo antes de esperar la respuesta del backend,
    //para mejorar la experiencia de usuario

    try {
      const response = (await httpClient().post(
        'http://localhost:8080/articulo-insumo',
        {
          body: JSON.stringify(newInsumo),
        }
      )) as IArticuloInsumo
      createInsumo(response)
    } catch (error: unknown) {
      //Si la petición sale mal, primero que nada se revierte lo que hicimos con el estado
      deleteInsumo(newInsumo.id!)
      //Luego se devuelve error
      let errorMessage = 'Error desconocido'

      if (error instanceof Error) {
        errorMessage = error.message
      }
      throw new Error(errorMessage)
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
      //Luego se devuelve error
      let errorMessage = 'Error desconocido'

      if (error instanceof Error) {
        errorMessage = error.message
      }
      throw new Error(errorMessage)
    }
  }

  const deleteInsumoById = async (id: number) => {
    const estadoPrevio: IArticuloInsumo | undefined = data.find(
      insumo => insumo.id === id
    )

    try {
      await httpClient().del(`http://localhost:8080/articulo-insumo/${id}`)
      //Optimistic update
      deleteInsumo(id)
    } catch (error) {
      //Si la petición sale mal, se revierte lo que hicimos con el estado, chequeando que estadoPrevio no sea undefined
      if (estadoPrevio) {
        postInsumo(estadoPrevio)
      }

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
      const response = await fetch(
        `http://localhost:8080/articulo-insumo/${id}/precio-stock`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      )

      if (!response.ok) {
        throw new Error('Error al actualizar el producto')
      }

      const data = await response.json()
      alert('Producto actualizado:' + data)
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
