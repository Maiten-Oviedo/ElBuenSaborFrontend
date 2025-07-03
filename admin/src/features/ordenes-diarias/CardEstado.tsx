import { IPedido } from '@/common/types/entities/IPedido'
import { useState } from 'react'

interface CardConfig {
  texto: string
  color: string
  accion: () => boolean | Promise<boolean>
}

export const getCardConfig = (
  pedido: IPedido,
  actualizarPedido: (pedido: Partial<IPedido> & { id: number }) => void,
): CardConfig => {
  switch (pedido.estadoEnum) {
    case 'PENDIENTE':
      return {
        texto: 'A cocina',
        color: '#B85607',
        accion: async () => {
          await actualizarPedido({ id: pedido.id, estadoEnum: 'PREPARACION' })
          return true
        },
      }

    case 'PREPARACION':
      return {
        texto: 'LISTO',
        color: '#569F59',
        accion: async () => {
          await actualizarPedido({ id: pedido.id, estadoEnum: 'TERMINADO' })
          return true
        },
      }

    case 'TERMINADO':
      if (pedido.estadoPagoEnum === 'PAGADO') {
        if (pedido.tipoEnvioEnum === 'DELIVERY') {
          return {
            texto: 'Despachar',
            color: '#1875D1',
            accion: async () => {
              await actualizarPedido({ id: pedido.id, estadoEnum: 'EN_VIAJE' })
              return true
            },
          }
        } else {
          return {
            texto: 'Entregar al cliente',
            color: '#D1A018',
            accion: async () => {
              await actualizarPedido({ id: pedido.id, estadoEnum: 'ENTREGADO' })
              return true
            },
          }
        }
      } else {
        return {
          texto: 'Esperando pago',
          color: '#888',
          accion: () => false,
        }
      }

    case 'EN_VIAJE':
      return {
        texto: 'Entregado',
        color: '#D1A018',
        accion: async () => {
          await actualizarPedido({ id: pedido.id, estadoEnum: 'ENTREGADO' })
          return true
        },
      }

    case 'ENTREGADO':
      return {
        texto: 'Eliminar de la lista',
        color: '#d9d9d9',
        accion: () => {
          return true
        },
      }

    default:
      return {
        texto: 'Acción no disponible',
        color: 'gray',
        accion: () => false,
      }
  }
}
