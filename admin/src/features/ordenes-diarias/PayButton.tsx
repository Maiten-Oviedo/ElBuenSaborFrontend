import { IPedido } from '@/common/types/entities/IPedido'
import { usePedidoStore } from '@/store/storePedidos'
import React from 'react'
import { IoCheckmarkSharp } from 'react-icons/io5'
type Props = {
  id: number
  pedidoPago: 'PENDIENTE' | 'RECHAZADO' | 'PAGADO'
}

const PayButton = ({id, pedidoPago="PENDIENTE" }: Props) => {
  const pagarPedido = usePedidoStore(state => state.pagarPedido)

  const handlePayClick = () => {
    pagarPedido({ id: id })
  }

  return (
    <button
      onClick={() => handlePayClick()}
      disabled={pedidoPago !== 'PENDIENTE'}
      style={{
        backgroundColor:
         pedidoPago !== 'PENDIENTE' ? '#d4edda' : '',
        color: pedidoPago !== 'PENDIENTE' ? '#155724' : '',
        padding: '8px 16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '120px',
        cursor: pedidoPago === 'PENDIENTE' ? 'pointer' : 'default',
      }}
    >
      {pedidoPago !== 'PENDIENTE' && <IoCheckmarkSharp size={16} />}
      Pagado
    </button>
  )
}

export default PayButton
