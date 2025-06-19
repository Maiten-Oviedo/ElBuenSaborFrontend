// src/hooks/useWebSocketPedidos.ts
import { useEffect } from 'react'
import { Client, IMessage } from '@stomp/stompjs'
import { usePedidoStore } from '@/store/storePedidos'
import { IPedido } from '@/common/types/entities/IPedido'

type EstadoPedidoDto = {
  pedidoId: number
  nuevoEstado:
  | 'PENDIENTE'
  | 'PREPARACION'
  | 'CANCELADO'
  | 'TERMINADO'
  | 'EN_VIAJE'
  | 'ENTREGADO'
  | undefined
  horaEstimadaFinalizacion?: string
  tipoEnvioEnum?: 'DELIVERY' | 'TAKEAWAY'
}

export const useWebSocketPedidos = () => {
  const actualizarEstado = usePedidoStore(state => state.actualizarEstado) // o actualizarEstado, como prefieras
  const agregarPedido = usePedidoStore(state => state.setPedidos) // o un método específico como agregarPedido
  const actualizarPedidoEnStore = usePedidoStore(state => state.actualizarPedidoEnStore)

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('[WebSocket] Conectado')

        //---------------------------
        // Escuchar cambios de estado
        //---------------------------
        client.subscribe('/topic/pedido-estado', (message: IMessage) => {
          const data: EstadoPedidoDto = JSON.parse(message.body)
          console.log('[WebSocket] ESTADO ACTUALIZADO ')
          console.log('data', data)

          usePedidoStore.getState().actualizarEstado({
            id: data.pedidoId,
            estadoEnum: data.nuevoEstado,
            horaEstimadaFinalizacion: data.horaEstimadaFinalizacion,
            tipoEnvioEnum: data.tipoEnvioEnum,
          })
        })

        //---------------------------
        // Escuchar nuevos pedidos
        //---------------------------
        client.subscribe('/topic/pedido-nuevo', (message: IMessage) => {
          const newPedidos: IPedido[] = []
          console.log('[WebSocket] PEDIDO NUEVO')
          const nuevoPedido: IPedido = JSON.parse(message.body)
          newPedidos.push(nuevoPedido)
          agregarPedido(newPedidos)
        })

        //---------------------------
        //Escuchar si un pedido fue pagado
        //---------------------------

        client.subscribe('/topic/pedido-pagado', (message: IMessage) => {
          const data: IPedido = JSON.parse(message.body)
          console.log('[WebSocket] PEDIDO PAGADO', data)

          actualizarPedidoEnStore(data)
        })
      },
      onStompError: frame => {
        console.error('[WebSocket] Error STOMP', frame)
      },
    })

    client.activate()

    return () => {
      client.deactivate()
    }
  }, [])
}
