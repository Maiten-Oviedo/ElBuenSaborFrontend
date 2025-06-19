import { IPedido } from '@/common/types/entities/IPedido'

interface CardConfig {
  texto: string
  color: string
  accion: () => void
}

export const getCardConfig = (
  pedido: IPedido,
  actualizarPedido: (pedido: Partial<IPedido> & { id: number }) => void
): CardConfig => {
  switch (pedido.estadoEnum) {
    case 'PENDIENTE':
      return {
        texto: 'A cocina',
        color: '#B85607',
        accion: () =>
          actualizarPedido({ id: pedido.id, estadoEnum: 'PREPARACION' }),
      }

    case 'PREPARACION':
      return {
        texto: 'LISTO',
        color: '#569F59',
        accion: () =>
          actualizarPedido({ id: pedido.id, estadoEnum: 'TERMINADO' }),
      }

    case 'TERMINADO':
      if (pedido.tipoEnvioEnum === 'DELIVERY') {
        return {
          texto: 'Despachar',
          color: '#1875D1',
          accion: () =>
            actualizarPedido({ id: pedido.id, estadoEnum: 'EN_VIAJE' }),
        }
      } else {
        return {
          texto: 'Entregar al cliente',
          color: '#D1A018',
          accion: () =>
            actualizarPedido({ id: pedido.id, estadoEnum: 'ENTREGADO' }),
        }
      }

    default:
      return {
        texto: 'TERMINADO',
        color: 'gray',
        accion: () =>
          actualizarPedido({ id: pedido.id, estadoEnum: 'TERMINADO' }),
      }
  }
}
