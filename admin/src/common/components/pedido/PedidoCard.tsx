'use client'

import React, { useEffect, useState } from 'react'
import { IPedido } from '@/common/types/entities/IPedido'
import { FaTrash, FaRegClock } from 'react-icons/fa'
import { GrLinkNext } from 'react-icons/gr'
import { usePedidoStore } from '@/store/storePedidos'
import TablaDetalle from '@/features/ordenes-diarias/TablaDetalleIngredientes'
import TimeSelect from '@/features/ordenes-diarias/TimeSelect'
import PayButton from '@/features/ordenes-diarias/PayButton'
import { getCardConfig } from '@/features/ordenes-diarias/CardEstado'
import useTimeRemaining from '@/common/hooks/useTimeRemaining'
import { IoIosArrowDown } from 'react-icons/io'

// Props para componente inicial de pedido
interface Props {
  pedidoId: number
}

const PedidoCard = ({ pedidoId }: Props) => {
  const {
    actualizarPedido,
    eliminarPedido,
    pedidos: pedidosStore,
  } = usePedidoStore()

  const pedido = usePedidoStore(state =>
    state.pedidos.find(p => p.id === pedidoId)
  )

  if (!pedido) return null

  //Manejo de card y modal
  const [expandido, setExpandido] = useState<boolean>(false)
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)

  const [tipoEnvio, setTipoEnvio] = useState(pedido.tipoEnvioEnum)

  //Definimos estilos segun estadoEnum
  const { texto, color, accion } = getCardConfig(pedido, actualizarPedido)

  //Manejar errores con animación de shake
  const [errorShake, setErrorShake] = useState<boolean>(false)

  //Cambiar tipo de envio
  const handleTipoEnvioChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const nuevoTipo = e.target.value as typeof tipoEnvio
    setTipoEnvio(nuevoTipo)
    await actualizarPedido({ id: pedido.id, tipoEnvioEnum: nuevoTipo })
  }

  //Modal eliminar pedido
  const handleDelete = async () => {
    await eliminarPedido(pedido)
    setShowConfirmModal(false)
  }

  const { minutosRestantes, sumarMinutos, setHora } = useTimeRemaining({
    horaEstimadaInicial: pedido.horaEstimadaFinalizacion,
    onActualizarHora: async nuevaHora => {
      await actualizarPedido({
        id: pedido.id,
        horaEstimadaFinalizacion: nuevaHora,
      })
    },
  })

  useEffect(() => {
    if (pedido.horaEstimadaFinalizacion !== undefined) {
      setHora(pedido.horaEstimadaFinalizacion)
    }
  }, [pedido, setHora])

  //Validación: si un pedido no tiene ingredientes, es un articulo insumo vendible, por lo tanto se debe entregar automaticamente
  // const { ingredientesPorArticulo } = usePedidoStore()
  // useEffect(() => {
  //   setLoading(true)

  //   const sinIngredientes = pedido.listaDetalle.every(detalle => {
  //     const ingredientes = ingredientesPorArticulo[detalle.articuloId]
  //     return !ingredientes || ingredientes.length === 0
  //   })

  //   if (sinIngredientes && pedido.estadoEnum === 'PREPARACION') {
  //     actualizarPedido({ id: pedido.id, estadoEnum: 'ENTREGADO' })
  //     setLoading(false)
  //   }
  // }, [ingredientesPorArticulo, pedido, actualizarPedido])

  return (
    <div
      style={{
        backgroundColor:
          minutosRestantes <= 0 &&
            pedido.estadoEnum !== 'EN_VIAJE' &&
            pedido.estadoEnum !== 'ENTREGADO'
            ? '#d1726b'
            : 'white',
      }}
      className={`items-center h-fit text-black rounded-xl px-3 overflow-hidden shadow-md transition-all duration-500 ease-in-out ${expandido ? 'max-h-[300px] h-auto' : ' min-h-30 max-h-40'
        }`}
    >
      <div className=' overflow-y-scroll'>
        <div className="flex justify-between items-center mt-5 gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <h2 className="font-extrabold text-[#7F3900] text-3xl">
              ORDEN #{pedido.id}
            </h2>
            <div className="flex gap-3 items-center font-bold text-2xl">
              {pedido.estadoEnum !== 'EN_VIAJE' && pedido.estadoEnum !== 'ENTREGADO' ? (
                <>
                  <FaRegClock /> {minutosRestantes} MIN
                  {expandido && pedido.estadoEnum == 'PREPARACION' && (
                    <TimeSelect
                      setTiempo={valor => {
                        const minutos = parseInt(valor.replace('+', ''), 10)
                        sumarMinutos(minutos)
                      }}
                    />
                  )}
                </>
              ) : (
                <h2 className="text-lg">Cliente: {pedido.nombreCompleto}</h2>
              )


              }
              {pedido?.estadoEnum == 'EN_VIAJE' && (
                <div className="flex items-start justify-start gap-5 w-[800px]">
                  <h3>Direccion:</h3>
                  <div>
                    <h4 className="underline text-xl font-bold text-center">
                      {' '}
                      {pedido.domicilio.calle +
                        ' ' +
                        pedido.domicilio.numero +
                        ', ' +
                        pedido.domicilio.localidad.nombre +
                        ', ' +
                        pedido.domicilio.provincia.nombre}
                    </h4>
                    <h6 className="text-sm">{pedido.domicilio.descripcion}</h6>
                  </div>
                </div>
              )}
            </div>
          </div>

          {expandido && pedido.estadoEnum !== 'EN_VIAJE' && (
            <TablaDetalle pedido={pedido} estadoActual={pedido.estadoEnum} />
          )}

          {expandido && pedido.estadoEnum !== 'PREPARACION' && (
            <div className="flex flex-col flex-1">
              {pedido.tipoEnvioEnum === 'DELIVERY' ? (
                <>
                  <p>(${pedido.gastosEnvio} por envio)</p>
                  <p>Total: ${pedido.total}</p>
                </>
              ) : (
                <p>Total: ${pedido.total}</p>
              )}

              {(pedido.estadoEnum === 'PENDIENTE' ||
                pedido.estadoEnum === 'TERMINADO') && (
                  <>
                    <PayButton id={pedido.id} pedidoPago={pedido.estadoPagoEnum} />

                    <div className="flex gap-4 mt-2">
                      <h2>Retiro:</h2>
                      <p>{pedido.tipoEnvioEnum}</p>
                    </div>
                  </>
                )}
            </div>
          )}

          {pedido.estadoEnum != 'ENTREGADO' && (
            <div className="flex items-center justify-center gap-5 h-full w-full flex-1">
              <button
                onClick={async () => {
                  const ok = await accion()
                  if (!ok) {
                    setErrorShake(true)

                    setTimeout(() => {
                      setErrorShake(false)
                    }, 1000)
                  }
                }}
                className={`cursor-pointer px-4 py-2 text-xl border-2 rounded-4xl font-bold transition-all duration-150 ${errorShake ? 'animate-shake' : ''
                  }`}
                style={{ borderColor: color, color: color }}
              >
                <GrLinkNext
                  color={color}
                  size={24}
                  className="inline-block mr-2"
                />
                {texto}
              </button>

              {!(pedido.estadoEnum === 'EN_VIAJE') && (
                <button
                  className="p-2 rounded-full bg-red w-fit cursor-pointer"
                  onClick={() => setShowConfirmModal(true)}
                >
                  <FaTrash size={15} fill="white" />
                </button>
              )}
            </div>
          )}
        </div>

      </div>
      {pedido.estadoEnum != 'ENTREGADO' && pedido.estadoEnum != 'EN_VIAJE' &&
        <button
          className="cursor-pointer rounded-full mt-2 bg-gray-300 h-[15px] flex items-center justify-center w-full"
          onClick={() => setExpandido(!expandido)}
          aria-label={expandido ? 'Comprimir detalles' : 'Expandir detalles'}
        >
          <IoIosArrowDown />
        </button>
      }

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center space-y-4">
            <h2 className="text-xl font-bold">¿Estás seguro?</h2>
            <p>¿Querés cancelar este pedido?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Sí, cancelar
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PedidoCard
