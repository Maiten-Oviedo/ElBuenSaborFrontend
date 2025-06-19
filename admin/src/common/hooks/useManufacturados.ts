import httpClient from '@/common/lib/httpClient'
import { IArticuloManufacturado } from '@/common/types/entities/IArticuloManufacturado'
import { useStoreCategoriasManufacturados } from '@/store/storeCategoriasManufacturados'
import { useStoreManufacturados } from '@/store/storeManufacturados'
import { useShallow } from 'zustand/shallow'

export const useManufacturados = () => {
  const setShouldRefresh = useStoreCategoriasManufacturados(
    state => state.setShouldRefresh
  )
  const {
    data,
    setData,
    createManufacturado,
    updateManufacturado,
    deleteManufacturado,
  } = useStoreManufacturados(
    useShallow(state => ({
      data: state.data,
      setData: state.setData,
      createManufacturado: state.createManufacturado,
      updateManufacturado: state.updateManufacturado,
      deleteManufacturado: state.deleteManufacturado,
    }))
  )

  const getManufacturados = async () => {
    try {
      const response = await httpClient().get(
        'http://localhost:8080/articulo-manufacturado/getAll'
      )
      //Si la petición sale bien, se agregan los datos traidos al estado de Data
      setData((await response) as IArticuloManufacturado[])
    } catch (error: unknown) {
      //Si la petición sale mal, se tira un error para que lo reciba el componente
      let errorMessage = 'Error desconocido'

      if (error instanceof Error) {
        errorMessage = error.message
      }
      throw new Error(errorMessage)
    }
  }

  const postManufacturado = async (
    newManufacturado: IArticuloManufacturado
  ) => {
    //Esto se llama optimistic update:
    //Se agrega al estado de zustand el insumo nuevo antes de esperar la respuesta del backend,
    //para mejorar la experiencia de usuario
    createManufacturado(newManufacturado)

    try {
      await httpClient().post('http://localhost:8080/articulo-manufacturado', {
        body: JSON.stringify(newManufacturado),
      })
    } catch (error: unknown) {
      //Si la petición sale mal, primero que nada se revierte lo que hicimos con el estado
      deleteManufacturado(newManufacturado.id!)
      //Luego se devuelve error
      let errorMessage = 'Error desconocido'

      if (error instanceof Error) {
        errorMessage = error.message
      }
      throw new Error(errorMessage)
    }
  }

  const putManufacturado = async (
    updatedManufacturado: IArticuloManufacturado
  ) => {
    //Guardamos el insumo sin editar para tenerlo como backup
    const estadoPrevio: IArticuloManufacturado | undefined = data.find(
      manuf => manuf.id === updatedManufacturado.id
    )
    //Optimistic update
    updateManufacturado(updatedManufacturado)

    try {
      await httpClient().put(
        `http://localhost:3001/articulo-manufacturado/${updatedManufacturado.id}`,
        {
          body: JSON.stringify(updatedManufacturado),
        }
      )
    } catch (error: unknown) {
      //Si la petición sale mal, se revierte lo que hicimos con el estado, chequeando que estadoPrevio no sea undefined
      if (estadoPrevio) {
        updateManufacturado(estadoPrevio)
      }
      //Luego se devuelve error
      let errorMessage = 'Error desconocido'

      if (error instanceof Error) {
        errorMessage = error.message
      }
      throw new Error(errorMessage)
    }
  }

  const deleteManufacturadoById = async (id: number) => {
    const estadoPrevio: IArticuloManufacturado | undefined = data.find(
      manuf => manuf.id === id
    )
    //Optimistic update
    deleteManufacturado(id)

    try {
      await httpClient().del(
        `http://localhost:8080/articulo-manufacturado/${id}`
      )
      setShouldRefresh(true)
    } catch (error) {
      //Si la petición sale mal, se revierte lo que hicimos con el estado, chequeando que estadoPrevio no sea undefined
      if (estadoPrevio) {
        postManufacturado(estadoPrevio)
      }

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
    getManufacturados,
    postManufacturado,
    putManufacturado,
    deleteManufacturadoById,
  }
}
