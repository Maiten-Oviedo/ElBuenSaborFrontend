import { IArticulo } from './IArticulo'

export interface IArticuloInsumo extends IArticulo {
  precioCosto: number
  unidadMedidaEnum: string
  stockActual: number
  stockMaximo: number
  stockMinimo: number
  esParaPreparar: boolean
  esVendible: boolean
  categoriaDenominacion?: string
}
