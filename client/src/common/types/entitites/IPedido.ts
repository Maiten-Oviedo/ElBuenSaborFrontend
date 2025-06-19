import { IDetallePedido } from './IDetallePedido'

export interface IPedido {
  id?: number
  horaEstimadaFinalizacion?: string
  total?: number
  gastosEnvio?: number
  estadoEnum?:
    | 'PREPARACION'
    | 'PENDIENTE'
    | 'CANCELADO'
    | 'TERMINADO'
    | 'EN_VIAJE'
    | 'ENTREGADO'
    | null
  fechaPedido?: string
  nombreCompleto?: string
  estadoPagoEnum?: string
  tipoEnvioEnum: 'TAKEAWAY' | 'DELIVERY'
  formaPagoEnum: 'EFECTIVO' | 'MERCADOPAGO'
  indicaciones: string | null
  listaDetalle: IDetallePedido[]
  domicilioId: number
  clienteId: number
}
