import { IFactura } from './IFactura'

export interface IFacturaMercadoPago extends IFactura {
  mpPaymentId: number
  mpMerchantOrderId: number
  mpPreferenceId: string
  mpPaymentType: string
}
