'use client'
import httpClient from '@/common/lib/httpClient'
import React, { useEffect, useState } from 'react'
import { FaFileDownload } from 'react-icons/fa'
import { useParams } from 'next/navigation'
import { IPedido } from '@/common/types/entities/IPedido'
import { IDomicilio } from '@/common/types/entities/IDomicilio'
import Modal from '@/common/components/modal/Modal'
import Button from '@/common/components/button/Button'

const Page = () => {
  const { id } = useParams()
  const [pedido, setPedido] = useState<IPedido | null>(null)

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        // 1. Obtener el pedido
        const pedidoResponse = (await httpClient().get(
          `http://localhost:8080/pedido/${id}`
        )) as IPedido
        setPedido(pedidoResponse)
      } catch (error) {
        console.error('Error al obtener datos del pedido:', error)
      }
    }

    fetchPedido()
  }, [id])

  const handlePDF = async () => {
    if (!pedido) return

    try {
      const response = await fetch(
        `http://localhost:8080/facturas/pedido/${pedido.id}`,
        {
          credentials: 'include',
        }
      )

      const blob = await response.blob()

      if (response.headers.get('Content-Type') !== 'application/pdf') {
        const text = await blob.text()
        console.error('Respuesta inesperada:', text)
        return
      }

      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `factura_pedido_${pedido.id}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error descargando el PDF:', error)
      alert('Hubo un problema al generar la factura.')
    }
  }

  if (!pedido) {
    return (
      <Modal>
        <p className="text-white">Cargando pedido...</p>
      </Modal>
    )
  }

  return (
    <Modal>
      <h1 className="text-4xl text-white text-center">Órden #{pedido.id}</h1>
      <ul className="text-white">
        <li className="border-b border-white p-1">
          Estado:{' '}
          <span className="text-red font-bold">{pedido.estadoEnum}</span>
        </li>
        <li className="border-b border-white p-1">
          Estado de pago:{' '}
          <span className="text-red font-bold">{pedido.estadoPagoEnum}</span>
        </li>
        <li className="border-b border-white p-1">
          Fecha de la órden:{' '}
          <span className="font-semibold">{pedido.fechaPedido}</span>
        </li>
        <li className="border-b border-white p-1">
          Cliente:{' '}
          <span className="font-semibold">
            {pedido.nombreCompleto} (ID: {pedido.clienteId})
          </span>
        </li>
        <li className="border-b border-white p-1">
          Dirección:{' '}
          <span className="font-semibold">{`${pedido.domicilio.calle} ${
            pedido.domicilio.numero || ''
          }, ${pedido.domicilio.localidad?.nombre ?? ''}, CP ${
            pedido.domicilio.codigoPostal
          }`}</span>
        </li>
        <li className="border-b border-white p-1">
          Metodo de Pago:{' '}
          <span className="font-semibold">{pedido.formaPagoEnum}</span>
        </li>
        <li className="border-b border-white p-1">
          Entrega:{' '}
          <span className="font-semibold">
            {pedido.tipoEnvioEnum === 'TAKEAWAY'
              ? 'TAKEAWAY (-10%)'
              : `DELIVERY (+$${pedido.gastosEnvio} de envio)`}
          </span>
        </li>
        <li className="p-1">
          Indicaciones:{' '}
          <span className="font-semibold">"{pedido.indicaciones}"</span>
        </li>
      </ul>
      <h3 className="text-xl text-white mt-4 font-semibold">Productos</h3>
      <ul>
        <li className="flex flex-row justify-between text-white px-3">
          <span>Id</span>
          <span>Producto</span>
          <span>Cantidad</span>
          <span>Subtotal</span>
        </li>
        {pedido.listaDetalle.map(item => (
          <li
            key={`producto-orden-${item.articuloId}`}
            className="bg-red p-3 flex flex-row justify-between w-full rounded-full text-white mb-2"
          >
            <p>{item.articuloId}</p>
            <p>{item.articuloDenominacion}</p>
            <p>x{item.cantidad}</p>
            <p>${item.subTotal}</p>
          </li>
        ))}
      </ul>
      {pedido.tipoEnvioEnum === 'TAKEAWAY' ? (
        <p className="text-end text-white text-lg">- 10%</p>
      ) : (
        <p className="text-end text-white text-lg">+${pedido.gastosEnvio}</p>
      )}
      <p className="text-white text-2xl text-end">Total: ${pedido.total}</p>
      {pedido.estadoPagoEnum === 'PAGADO' && (
        <Button
          onClick={handlePDF}
          variant="secondary"
          icon={<FaFileDownload />}
          className="mt-4 self-center"
        >
          Descargar factura en PDF
        </Button>
      )}
    </Modal>
  )
}

export default Page
