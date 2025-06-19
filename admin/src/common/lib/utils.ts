import type { IImagenArticulo } from '@/common/types/entities/IImagenArticulo'
import { IArticuloManufacturado } from '../types/entities/IArticuloManufacturado'
import { IArticuloInsumo } from '../types/entities/IArticuloInsumo'

export const transformStepTwoValues = (values: {
  denominacion: string
  imagenesUrls: IImagenArticulo[]
  descripcion: string
  productoActivo: string
}) => {
  const imagenesUrls = values.imagenesUrls.map(url => url.url)

  const transformedValues = {
    ...values,
    imagenesUrls,
  }
  delete transformedValues.imagenesUrls

  return transformedValues
}

export const transformStepTwoValuesForEdit = (
  values: {
    denominacion: string
    imagenesUrls: IImagenArticulo[]
    descripcion: string
    productoActivo: string
  },
  product: IArticuloManufacturado
) => {
  // Crear un mapa de URLs a objetos imagen para búsqueda más eficiente
  const urlToImageMap = new Map()

  if (product?.imagenesUrls && Array.isArray(product.imagenesUrls)) {
    product.imagenesUrls.forEach((img: IImagenArticulo) => {
      const normalizedUrl = img.url.trim().toLowerCase()
      urlToImageMap.set(normalizedUrl, img)
    })
  }

  const imagenesUrls = values.imagenesUrls

  const transformedValues = {
    ...values,
    imagenesUrls,
  }

  return transformedValues
}

export const createInsumosOptions = (insumos: IArticuloInsumo[]) => {
  return insumos.map(insumo => ({
    label: insumo.denominacion,
    value: insumo.id!,
  }))
}

export const getInitialValuesForEdit = (product: IArticuloManufacturado) => {
  return {
    stepOne: {
      categoriaId: product?.categoriaId ?? 0,
    },
    stepTwo: {
      denominacion: product?.denominacion ?? '',
      productoActivo: product?.productoActivo ? 'true' : 'false',
      descripcion: product?.descripcion ?? '',
      imagenesUrls: product?.imagenesUrls, // se conserva para enviar al back
      imagenesUrlsInput:
        product?.imagenesUrls?.map(i => i.url).join(', ') ?? '', // NUEVO
    },
    stepThree: {
      articuloManufacturadoDetalle: product?.articuloManufacturadoDetalle ?? [],
    },
    stepFour: {
      precioCosto: product?.precioCosto ?? 0,
      precioVenta: product?.precioVenta ?? 0,
      tiempoEstimadoMinutos: product?.tiempoEstimadoMinutos ?? 0,
    },
  }
}
