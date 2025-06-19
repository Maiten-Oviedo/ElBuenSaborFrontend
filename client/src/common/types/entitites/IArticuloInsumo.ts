import { IArticulo } from "./IArticulo"

export interface IArticuloInsumo extends IArticulo {
  precioCompra: number
  unidadMedidaEnum: string
  stockActual: number
  stockMaximo: number
  stockMinimo: number
  esParaPreparar: boolean
  esVendible: boolean
}