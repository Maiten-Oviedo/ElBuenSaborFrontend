import { IDetallePedido } from "./IDetallePedido"
import { IDomicilio } from "./IDomicilio";

export interface IPedido {
  id: number;
  horaEstimadaFinalizacion: string;
  total: number;
  gastosEnvio: number;
  estadoEnum:
    | 'PENDIENTE'
    | 'PREPARACION'
    | 'CANCELADO'
    | 'TERMINADO'
    | 'EN_VIAJE'
    | 'ENTREGADO';

  tipoEnvioEnum: 'DELIVERY' | 'TAKEAWAY';
  formaPagoEnum: 'EFECTIVO' | 'MERCADOPAGO';
  estadoPagoEnum: 'PENDIENTE' | 'RECHAZADO' | 'PAGADO'
  fechaPedido: string;
  
  // Relaciones
  nombreCompleto: string;
  domicilioId: number;
  domicilio: IDomicilio;
  clienteId: number;
  idSucursal: number;
  
  listaDetalle: IDetallePedido[];
  
  indicaciones: string;
}
