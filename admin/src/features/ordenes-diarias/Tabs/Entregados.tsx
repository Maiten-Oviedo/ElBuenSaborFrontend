'use client'

import PedidoCard from '@/common/components/pedido/PedidoCard'
import { usePedidoStore } from '@/store/storePedidos'
import { useMemo } from 'react'
import { GoInbox } from 'react-icons/go'

const Entregados = () => {
  const pedidos = usePedidoStore(state => state.pedidos)

  const pedidosFiltrados = useMemo(
    () => pedidos.filter(p => p.estadoEnum === 'ENTREGADO'),
    [pedidos]
  )

  return (
    <div>
      {pedidosFiltrados.length <= 0 ? (
        <div className='flex flex-col gap-4 items-center justify-center w-full'>
          <GoInbox size={40} />
          <h1 className='text-3xl'>ENTREGADOS</h1>
        </div>

      ) : (
        <div className="flex flex-col gap-5 py-4 overflow-y-auto max-h-[80vh]">

          {pedidosFiltrados.map(el => (
            <PedidoCard key={el.id} pedidoId={el.id} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Entregados;