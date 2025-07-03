"use client"

import PedidoCard from '@/common/components/pedido/PedidoCard'
import { IngredientesPorArticulo, usePedidoStore } from '@/store/storePedidos'
import React, { useEffect, useMemo, useState } from 'react'
import { GoInbox } from 'react-icons/go';

const Cocina = () => {
  const pedidos = usePedidoStore(state => state.pedidos)

  const pedidosFiltrados = useMemo(
    () => pedidos.filter(p => p.estadoEnum === 'PREPARACION'),
    [pedidos]
  )

  return (
    <div>

      {pedidosFiltrados.length <= 0 ? (
        <div className='flex flex-col gap-4 items-center justify-center w-full'>
          <GoInbox size={40} />
          <h1 className='text-3xl'>PREPARACIÓN</h1>
        </div>
      ) : (
        <div className='flex flex-col gap-5 py-4 overflow-y-auto max-h-[80vh]'>
          {pedidosFiltrados.map((pedido, i) => (
            <PedidoCard
              key={i}
              pedidoId={pedido.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Cocina;
