'use client'

import Button from '@/common/components/ui/Button'
import { formatMessageWithBoldQuotes } from '@/common/components/ui/formatMessageWithBoldQuotes'
import { Stepper } from '@/common/components/ui/Stepper'
import httpClient from '@/common/lib/httpClient'
import { useAuthStore } from '@/common/store/useAuthStore'
import { useCartStepsStore } from '@/common/store/useCartStepsStore'
import { useCartStore } from '@/common/store/useCartStore'
import { IPedido } from '@/common/types/entitites/IPedido'
import CartStepOne from '@/features/cart/CartStepOne'
import CartStepThree from '@/features/cart/CartStepThree'
import CartStepTwo from '@/features/cart/CartStepTwo'
import PaymentBrick from '@/features/cart/PaymentBrick'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/shallow'

const Carrito = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1)

  const cliente = useAuthStore(state => state.cliente)
  const logout = useAuthStore(state => state.logout)
  const [error, setError] = useState<string | null>(null)

  const { items, clearCart } = useCartStore(
    useShallow(state => ({
      items: state.items,
      clearCart: state.clearCart,
    }))
  )

  const {
    metodoPago: metodoPagoSeleccionado,
    retiro: retiroSeleccionado,
    domicilio: domicilioSeleccionado,
    indicaciones,
  } = useCartStepsStore(
    useShallow(state => ({
      metodoPago: state.metodoPago,
      retiro: state.retiro,
      domicilio: state.domicilio,
      indicaciones: state.indicaciones,
    }))
  )

  const [pedidoSent, setPedidoSent] = useState<IPedido | null>(null)

  const [mountMPBrick, setMountMPBrick] = useState<boolean>(false)

  const searchParams = useSearchParams()
  const router = useRouter()

  const handleNextStep = async () => {
    const { verificarStock } = useCartStore.getState()

    if (currentStep === 1) {
      if (!cliente) {
        router.push('/auth/login')
        return
      }

      // Verificar stock antes de avanzar
      const resultado = await verificarStock()

      if (!resultado.ok) {
        toast.error(formatMessageWithBoldQuotes(resultado.message))
        return
      }

      setCurrentStep(2)
    }

    if (currentStep === 2) {
      if (domicilioSeleccionado === null) {
        setError('Debes ingresar una dirección.')
        return
      }

      const pedidoSent = await handleSubmitPedido()

      if (pedidoSent === null) return
      setPedidoSent(pedidoSent)

      if (pedidoSent && metodoPagoSeleccionado === 'EFECTIVO') {
        setCurrentStep(3)
        // Se limpia el carrito del estado y del localStorage
        clearCart()
      }

      if (pedidoSent && metodoPagoSeleccionado === 'MERCADOPAGO') {
        setMountMPBrick(true)
      }
    }
  }

  const handleSubmitPedido = async (): Promise<IPedido | null> => {
    setError(null)
    if (!cliente) {
      await logout()
      router.push('/auth/logout')
      return null
    }

    const pedido: IPedido = {
      tipoEnvioEnum: retiroSeleccionado,
      formaPagoEnum: metodoPagoSeleccionado,
      clienteId: cliente.id!,
      domicilioId: domicilioSeleccionado!,
      indicaciones: indicaciones,
      listaDetalle: items.map(producto => ({
        cantidad: producto.cantidad,
        articuloId: producto.id!,
      })),
    }

    try {
      const response = await httpClient().post('http://localhost:8080/pedido', {
        body: JSON.stringify(pedido),
      })

      return response as IPedido
    } catch (error: unknown) {
      setError(`Error al crear el pedido: ${(error as Error).message}`)
      return null
    }
  }

  //UseEffect que detecta si el usuario viene de regreso de MercadoPago luego de pagar
  useEffect(() => {
    setError(null)
    const status = searchParams.get('status')
    const fromMP = searchParams.get('collection_id')
    const idPedido = searchParams.get('external_reference')

    if (status === 'approved' && fromMP) {
      const fetchPedido = async () => {
        const response = (await httpClient().get(
          `http://localhost:8080/pedido/${idPedido}`
        )) as IPedido
        console.log('PEDIDO: ', response)
        setPedidoSent(await response)
      }
      fetchPedido()
      setCurrentStep(3)

      // Se limpian los parámetros de la URL para que no queden visibles
      const cleanUrl = new URL(window.location.href)
      cleanUrl.search = ''
      window.history.replaceState({}, document.title, cleanUrl.toString())

      // Se limpia el carrito del estado y del localStorage
      clearCart()
    } else if (status === 'rejected' && fromMP) {
      router.push('/pago/rechazado')
    } else if (status === 'in_process' && fromMP) {
      router.push('/pago/pendiente')
    } else if (fromMP) {
      router.push('/pago/rechazado')
    }
  }, [])

  //Este bloque soluciona problemas de hidratación
  {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
      setHasMounted(true)
    }, [])

    if (!hasMounted) return null
  }

  return (
    <div
      className="flex min-h-screen p-12 pt-28 text-white items-start justify-center"
      style={{
        backgroundImage: 'url("/images/carrito-perfil/fondo-naranja.webp")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
      }}
    >
      {/* === NO HAY ITEMS EN EL CARRITO === */}
      {items.length <= 0 && currentStep < 3 ? (
        <div className="mt-12 flex flex-col items-center gap-3">
          <Image
            src={'/images/carrito-perfil/burger-boy-cart.webp'}
            alt="icono"
            width={200}
            height={200}
          />
          <h1 className="text-2xl font-bold mt-14">
            Aún no hay items en tu carrito
          </h1>
          <h3>
            Agrega tu favorito desde el{' '}
            <Link href={'/menu'} className="underline text-xl">
              Menú
            </Link>
          </h3>
        </div>
      ) : (
        /* === HAY ITEMS EN EL CARRITO === */
        <div className="w-[80%] flex flex-col justify-center items-center gap-9">
          <h1 className="mt-10 text-center font-black text-5xl">TU CARRITO</h1>
          <Stepper currentStep={currentStep} />

          {currentStep === 1 && <CartStepOne />}
          {currentStep === 2 && <CartStepTwo />}
          {error && (
            <p className="text-white font-bold bg-red px-2 py-1 text-lg">
              {error}
            </p>
          )}
          {currentStep === 3 && pedidoSent && (
            <CartStepThree pedido={pedidoSent} />
          )}

          {!mountMPBrick ? (
            <div className="w-full h-[100px] flex justify-between items-center">
              <Button
                variant="secondary"
                className="h-[60px]"
                onClick={() => {
                  setError(null)
                  setCurrentStep(1)
                }}
                href={currentStep !== 2 ? '/menu' : undefined}
              >
                {currentStep === 2 ? '< PASO ANTERIOR' : '< VOLVER AL MENÚ'}
              </Button>
              {currentStep !== 3 && (
                <Button
                  variant="primary"
                  className="h-[60px]"
                  onClick={handleNextStep}
                >
                  CONTINUAR
                </Button>
              )}
            </div>
          ) : (
            pedidoSent && (
              <div className="w-full h-10 flex flex-start">
                <PaymentBrick pedidoId={pedidoSent.id!} />
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}

export default Carrito
