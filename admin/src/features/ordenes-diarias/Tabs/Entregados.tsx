'use client'

import PedidoCard from '@/common/components/pedido/PedidoCard'
import { usePedidoStore } from '@/store/storePedidos'
import { useMemo } from 'react'

const Entregados = () => {
  const pedidos = usePedidoStore(state => state.pedidos)

  const pedidosFiltrados = useMemo(
    () => pedidos.filter(p => p.estadoEnum === 'ENTREGADO'),
    [pedidos]
  )

  return (
    <div>
      <h1>A CONFIRMAR</h1>
      <div className="flex flex-col gap-5 py-4 overflow-y-auto max-h-[80vh]">
        {pedidosFiltrados.map(el => (
          <PedidoCard key={el.id} pedidoId={el.id} />
        ))}
      </div>
    </div>
  )
}

export default Entregados;