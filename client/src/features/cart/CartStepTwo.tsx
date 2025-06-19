'use client'
import { FormField } from '@/common/types/MyFormProps'
import CartPreviewModal from './CartPreviewModal'
import { useAuthStore } from '@/common/store/useAuthStore'
import { IDomicilio } from '@/common/types/entitites/IDomicilio'
import Link from 'next/link'
import RadioButton from '@/common/components/ui/forms/RadioButton'
import { useEffect, useState } from 'react'
import { useCartStepsStore } from '@/common/store/useCartStepsStore'
import httpClient from '@/common/lib/httpClient'
import { useShallow } from 'zustand/shallow'
import CartForm from '@/common/components/ui/forms/CartForm'
const getStepTwoFields = (domicilios: IDomicilio[]): FormField[] => [
  {
    name: 'nombre',
    label: 'Nombre',
    type: 'text',
    disabled: true,
  },
  { name: 'apellido', label: 'Apellido', type: 'text', disabled: true },
  { name: 'telefono', label: 'Teléfono', type: 'text', disabled: true },
  {
    name: 'direccion',
    label: 'Dirección',
    type: 'select',
    options: domicilios.map((domicilio: IDomicilio) => ({
      label: `${domicilio.calle} ${domicilio.numero}, ${domicilio.localidad.nombre}, ${domicilio.provincia.nombre}, CP ${domicilio.codigoPostal}`,
      value: domicilio.id!,
    })),
  },
]

const CartStepTwo = () => {
  const cliente = useAuthStore(state => state.cliente)

  const {
    metodoPago: metodoPagoSeleccionado,
    setMetodoPago: setMetodoPagoSeleccionado,
    retiro: retiroSeleccionado,
    setRetiro: setRetiroSeleccionado,
    domicilio: domicilioSeleccionado,
    setDomicilio: setDomicilioSeleccionado,
  } = useCartStepsStore(
    useShallow(state => ({
      metodoPago: state.metodoPago,
      setMetodoPago: state.setMetodoPago,
      retiro: state.retiro,
      setRetiro: state.setRetiro,
      domicilio: state.domicilio,
      setDomicilio: state.setDomicilio,
    }))
  )

  const [domicilios, setDomicilios] = useState<IDomicilio[]>([])
  const [loadingDomicilios, setLoadingDomicilios] = useState(true)
  useEffect(() => {
    const getDomicilios = async () => {
      if (!cliente?.id) return
      try {
        const response = await httpClient().get(`
          http://localhost:8080/cliente/${cliente.id}/domicilios`)
        console.log(response)
        setDomicilios(response)
      } catch (error) {
        console.error('Error al obtener los domicilios:', error)
      } finally {
        setLoadingDomicilios(false)
      }
    }

    getDomicilios()
  }, [cliente?.id])

  const initialValuesStepTwo = {
    nombre: cliente?.nombre || '',
    apellido: cliente?.apellido || '',
    telefono: cliente?.telefono || '',
    direccion: domicilios.length > 0 ? domicilios[0].id : 0,
  }

  return (
    <div className="w-full h-full grid grid-cols-[75%_25%] ">
      <div className="w-full h-full flex flex-col gap-8">
        <div className="w-full flex flex-col gap-6">
          <p className="text-3xl font-extrabold">CHEQUEÁ TUS DATOS</p>
          <div className="w-[80%]">
            {loadingDomicilios ? (
              <p>Cargando domicilios...</p>
            ) : (
              <CartForm
                initialValues={initialValuesStepTwo}
                fields={getStepTwoFields(domicilios)}
                onChange={values => {
                  console.log(values)
                  if (values.direccion) {
                    setDomicilioSeleccionado(values.direccion)
                  }
                }}
              />
            )}
            <div className="flex justify-end items-center">
              <Link href="/profile/direcciones">
                <button className="bg-[#92140C] text-sm rounded-full font-bold px-5 py-1.5 shadow-lg cursor-pointer hover:scale-105 hover: transition duration-200">
                  Agregar dirección
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-6">
          <p className="text-3xl font-extrabold">
            ELEGÍ CÓMO RETIRAR EL PEDIDO
          </p>
          <form className="w-[80%] h-11 flex gap-10">
            <RadioButton
              name="tipoRetiro"
              value="TAKEAWAY"
              label="En local (10% descuento)"
              checked={retiroSeleccionado === 'TAKEAWAY'}
              onChange={e => {
                setRetiroSeleccionado('TAKEAWAY')
              }}
            />

            <RadioButton
              name="tipoRetiro"
              value="DELIVERY"
              label="Delivery"
              checked={retiroSeleccionado === 'DELIVERY'}
              onChange={e => {
                setRetiroSeleccionado('DELIVERY')
              }}
            />
          </form>
        </div>
        <div className="w-full flex flex-col gap-6 mt-6">
          <p className="text-3xl font-extrabold">ELEGÍ TU MÉTODO DE PAGO</p>
          <form className="w-[80%] h-11 flex gap-10">
            <RadioButton
              name="metodoPago"
              value="EFECTIVO"
              label="Efectivo"
              checked={metodoPagoSeleccionado === 'EFECTIVO'}
              onChange={e => {
                setMetodoPagoSeleccionado('EFECTIVO')
              }}
            />

            <RadioButton
              name="metodoPago"
              value="MERCADOPAGO"
              label="Mercado Pago"
              checked={metodoPagoSeleccionado === 'MERCADOPAGO'}
              onChange={e => {
                setMetodoPagoSeleccionado('MERCADOPAGO')
              }}
              disabled={retiroSeleccionado === 'TAKEAWAY' ? true : false}
            />
          </form>
        </div>
      </div>
      <div className="w-[350px] h-full">
        <CartPreviewModal showButton={false} retiro={retiroSeleccionado} />
      </div>
    </div>
  )
}

export default CartStepTwo
