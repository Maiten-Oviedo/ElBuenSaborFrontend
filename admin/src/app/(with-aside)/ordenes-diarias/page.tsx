'use client'

import { useEffect, useState } from 'react'
import { usePedidoStore } from '@/store/storePedidos'
import { Tabs } from '@/common/components/tabs/Tabs'
import AConfirmar from '@/features/ordenes-diarias/Tabs/AConfirmar'
import Cocina from '@/features/ordenes-diarias/Tabs/Cocina'
import Listos from '@/features/ordenes-diarias/Tabs/Listos'
import Entregados from '@/features/ordenes-diarias/Tabs/Entregados'
import Delivery from '@/features/ordenes-diarias/Tabs/Delivery'
import { useWebSocketPedidos } from '@/common/hooks/useWebSocketPedidos'

const Page = () => {
  useWebSocketPedidos()
  const setPedidos = usePedidoStore(state => state.setPedidos)
  const [currentTab, setCurrentTab] = useState('PENDIENTES')

  useEffect(() => {
    fetch('http://localhost:8080/pedido')
      .then(res => res.json())
      .then(data => setPedidos(data))
  }, [setPedidos])

  return (
    <Tabs
      tabs={[
        {
          key: 'PENDIENTES',
          label: 'PENDIENTES',
          content: <AConfirmar />,
          color: '#AB2C21',
        },
        {
          key: 'PREPARACION',
          label: 'PREPARACION',
          content: <Cocina />,
          color: '#B85607',
        },
        {
          key: 'TERMINADOS',
          label: 'TERMINADOS',
          content: <Listos />,
          color: '#569F59',
        },
        {
          key: 'EN VIAJE',
          label: 'EN VIAJE',
          content: <Delivery />,
          color: '#1875D1',
        },
        {
          key: 'ENTREGADOS',
          label: 'ENTREGADOS',
          content: <Entregados />,
          color: '#D1A018',
        },
      ]}
      currentTab={currentTab}
      onTabChange={key => setCurrentTab(key)}
    />
  )
}

export default Page
