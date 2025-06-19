import { IPedido } from '@/common/types/entities/IPedido';
import { usePedidoStore } from '@/store/storePedidos';
import React from 'react'
import { IoCheckmarkSharp } from "react-icons/io5";
type Props = {
  pedido: IPedido
}

const PayButton = ({ pedido }: Props) => {
  const pagarPedido = usePedidoStore(state => state.pagarPedido)

  const handlePayClick = () => {
    pagarPedido({ id: pedido.id }) 
  }

  return (
    <button
      onClick={() => handlePayClick()}
      disabled={pedido?.estadoPagoEnum !== 'PENDIENTE'}
      style={{
        backgroundColor: pedido?.estadoPagoEnum !== 'PENDIENTE' ? '#d4edda' : '',
        color: pedido?.estadoPagoEnum !== 'PENDIENTE' ? '#155724' : '',
        padding: '8px 16px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '120px',
        cursor: pedido?.estadoPagoEnum === 'PENDIENTE' ? 'pointer' : 'default',
      }}
    >
      {pedido?.estadoPagoEnum !== 'PENDIENTE' && <IoCheckmarkSharp size={16} />}
      Pagado
    </button>
  )
}

export default PayButton