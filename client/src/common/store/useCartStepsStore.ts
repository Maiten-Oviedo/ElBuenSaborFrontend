import { create } from 'zustand'

type MetodoPago = 'EFECTIVO' | 'MERCADOPAGO'
type TipoRetiro = 'TAKEAWAY' | 'DELIVERY'

interface CartStepsState {
  metodoPago: MetodoPago
  retiro: TipoRetiro
  domicilio: number | null
  indicaciones: string | null
  setMetodoPago: (metodo: MetodoPago) => void
  setRetiro: (retiro: TipoRetiro) => void
  setDomicilio: (id: number) => void
  setIndicaciones: (indicaciones: string) => void
}

export const useCartStepsStore = create<CartStepsState>(set => ({
  metodoPago: 'EFECTIVO',
  retiro: 'TAKEAWAY',
  domicilio: null,
  indicaciones: null,
  setMetodoPago: nuevoMetodo => set({ metodoPago: nuevoMetodo }),

  setRetiro: nuevoRetiro => {
    if (nuevoRetiro === 'TAKEAWAY') {
      set({
        retiro: nuevoRetiro,
        metodoPago: 'EFECTIVO',
      })
    } else {
      set({ retiro: nuevoRetiro })
    }
  },

  setDomicilio: nuevoDomicilio => set({ domicilio: nuevoDomicilio }),
  setIndicaciones: nuevaIndicacion => set({ indicaciones: nuevaIndicacion }),
}))
