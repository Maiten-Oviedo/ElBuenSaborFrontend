import { create } from 'zustand'
import { IPedido } from '@/common/types/entities/IPedido'
import equal from 'fast-deep-equal'
import type { IArticuloInsumo } from '@/common/types/entities/IArticuloInsumo'
import type { IArticuloManufacturadoDetalle } from '@/common/types/entities/IManufacturadoDetalle'
import httpClient from '@/common/lib/httpClient'

interface PedidoStore {
  pedidos: IPedido[]
  setPedidos: (nuevos: IPedido[]) => void
  actualizarPedido: (
    pedidoActualizado: Partial<IPedido> & { id: number }
  ) => void
  pagarPedido: (pedidoAActualizar: Partial<IPedido> & { id: number }) => void
  actualizarEstado: (
    pedidoAActualizar: Partial<IPedido> & { id: number }
  ) => void
  eliminarPedido: (pedidoAActualizar: Partial<IPedido> & { id: number }) => void

  ingredientesPorArticulo: IngredientesPorArticulo
  setIngredientesPorArticulo: (ingredientes: IngredientesPorArticulo) => void

  articuloInsumos: IArticuloInsumo[]
  setArticuloInsumos: (insumos: IArticuloInsumo[]) => void

  actualizarPedidoEnStore: (pedido: IPedido) => void
}

export type IngredientesPorArticulo = {
  [articuloId: number]: IArticuloManufacturadoDetalle[]
}

export const usePedidoStore = create<PedidoStore>((set, get) => {
  //  Función reutilizable para actualizar un pedido en el store
  const actualizarPedidoEnStore = (pedidoActualizado: IPedido) => {
    set(state => {
      const index = state.pedidos.findIndex(p => p.id === pedidoActualizado.id)
      if (index === -1) return state

      console.log('Pedido recibido por WebSocket:', pedidoActualizado)
      console.log(
        'IDs actuales:',
        state.pedidos.map(p => p.id)
      )

      const existentes = state.pedidos
      const actualizado = { ...existentes[index], ...pedidoActualizado }

      if (equal(existentes[index], actualizado)) return state

      const nuevos = [...existentes]
      nuevos[index] = actualizado
      return { pedidos: nuevos }
    })
  }

  return {
    pedidos: [],
    ingredientesPorArticulo: {},
    articuloInsumos: [],
    actualizarPedidoEnStore,
    setIngredientesPorArticulo: ingredientes =>
      set({ ingredientesPorArticulo: ingredientes }),
    setArticuloInsumos: insumos => set({ articuloInsumos: insumos }),

    setPedidos: nuevos => {
      const actuales = get().pedidos
      const nuevosUnicos = nuevos.filter(
        nuevo => !actuales.some(actual => actual.id === nuevo.id)
      )
      if (nuevosUnicos.length === 0) return
      set({ pedidos: [...actuales, ...nuevosUnicos] })
    },

    actualizarEstado: pedidoAActualizar => {
      const actuales = get().pedidos
      const index = actuales.findIndex(p => p.id === pedidoAActualizar.id)
      if (index === -1) return

      const actualizado = { ...actuales[index], ...pedidoAActualizar }
      if (!equal(actuales[index], actualizado)) {
        const nuevos = [...actuales]
        nuevos[index] = actualizado
        set({ pedidos: nuevos })
      }
    },

    actualizarPedido: async pedidoActualizado => {
      console.log('se actualiza el pedido', pedidoActualizado.id)
      const body = {
        nuevoEstado: pedidoActualizado.estadoEnum,
        estadoPagoEnum: pedidoActualizado.estadoPagoEnum,
        horaEstimadaFinalizacion: pedidoActualizado.horaEstimadaFinalizacion,
        tipoEnvioEnum: pedidoActualizado.tipoEnvioEnum,
      }
      console.log(
        'valor horaEstimadaFinalizacion:',
        pedidoActualizado.horaEstimadaFinalizacion
      )
      try {
        const res = await httpClient().put(
          `http://localhost:8080/pedido/${pedidoActualizado.id}/estado`,
          {
            body: JSON.stringify(body),
          }
        )
        if (res.status === 200) {
          actualizarPedidoEnStore({
            id: pedidoActualizado.id,
            estadoEnum: pedidoActualizado.estadoEnum,
            estadoPagoEnum: pedidoActualizado.estadoPagoEnum,
            horaEstimadaFinalizacion:
              pedidoActualizado.horaEstimadaFinalizacion,
            tipoEnvioEnum: pedidoActualizado.tipoEnvioEnum,
          } as IPedido)
        }
      } catch (error) {
        console.error('Error al actualizar el pedido:', error)
      }
    },

    pagarPedido: async pedidoAActualizar => {
      try {
        console.log(pedidoAActualizar.id)
        const response = await httpClient().put(
          `http://localhost:8080/pedido/pagar/${pedidoAActualizar.id}`
        )

        if (response.data) {
          actualizarPedidoEnStore(response as IPedido)
          console.log('respuesta de pago', response.data)
        }
      } catch (error) {
        console.error('Error al pagar el pedido:', error)
      }
    },

    eliminarPedido: pedidoAEliminar => {
      const actuales = get().pedidos
      const nuevos = actuales.filter(p => p.id !== pedidoAEliminar.id)
      if (nuevos.length !== actuales.length) {
        set({ pedidos: nuevos })
      }

      console.log('pedido a eliminar', pedidoAEliminar.id)
      // Llamar a actualizarEstado con estadoEnum: "CANCELADO"
      get().actualizarPedido({
        id: pedidoAEliminar.id,
        estadoEnum: 'CANCELADO',
      })
    },
  }
})
