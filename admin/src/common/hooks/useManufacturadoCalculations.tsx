"use client";

import type React from "react";

import { useEffect } from "react";
import type { FormThreeValues } from "@/features/modalManufacturado/FormRecetaManufacturado";
import { useStoreInsumos } from "@/store/storeInsumos";

export const useManufacturadoCalculations = (
  formThreeValues: FormThreeValues,
  insumos: any[],
  setFormFourValues: React.Dispatch<React.SetStateAction<any>>,
  isEditing = false
) => {
  // Función para calcular el precio de costo siguiendo la lógica del backend

  const calcularPrecioCosto = (
    detalles: FormThreeValues["articuloManufacturadoDetalle"]
  ) => {
    const insumos = useStoreInsumos.getState().data;
    let costoTotal = 0;

    detalles.forEach((detalle) => {
      const insumo = insumos.find(
        (insumo) => Number(insumo.id) === Number(detalle.articuloInsumoId)
      );
      console.log("INSUMO: ", insumo);
      if (insumo && insumo.precioVenta != null) {
        const { precioVenta, unidadMedidaEnum } = insumo;
        console.log("AAAA", precioVenta, unidadMedidaEnum);

        const usaPrecioDirecto =
          unidadMedidaEnum === "KG" ||
          unidadMedidaEnum === "L" ||
          unidadMedidaEnum === "UNIDAD";

        const precioUnitario = usaPrecioDirecto
          ? precioVenta // multiplico directamente
          : precioVenta / 1000; // paso a precio por gramo/ml/etc.

        const precioPorCantidad = precioUnitario * detalle.cantidad;
        costoTotal += precioPorCantidad;
      }
    });

    return Number(costoTotal.toFixed(4));
  };

  // Función para calcular el tiempo estimado
  const calcularTiempoEstimado = (
    detalles: FormThreeValues["articuloManufacturadoDetalle"]
  ) => {
    let totalTiempoEstimado = 0;

    detalles.forEach((detalle) => {
      const insumo = insumos.find(
        (insumo) => Number(insumo.id) === Number(detalle.articuloInsumoId)
      );
      if (insumo) {
        totalTiempoEstimado += insumo.tiempoEstimadoMinutos || 0;
      }
    });

    return totalTiempoEstimado;
  };

  useEffect(() => {
    if (!formThreeValues || !formThreeValues.articuloManufacturadoDetalle)
      return;

    const totalTiempoEstimado = calcularTiempoEstimado(
      formThreeValues.articuloManufacturadoDetalle
    );
    const precioCostoCalculado = calcularPrecioCosto(
      formThreeValues.articuloManufacturadoDetalle
    );

    setFormFourValues((prev: any) => {
      if (isEditing) {
        // En edición: ajustar precio de venta si es menor al nuevo costo
        const nuevoPrecioVenta =
          prev.precioVenta < precioCostoCalculado
            ? precioCostoCalculado * 1.3
            : prev.precioVenta;

        return {
          ...prev,
          tiempoEstimadoMinutos: totalTiempoEstimado,
          precioCosto: precioCostoCalculado,
          precioVenta: Math.max(nuevoPrecioVenta, precioCostoCalculado),
        };
      } else {
        // En creación: calcular precio de venta sugerido
        const precioVentaSugerido = Number(
          (precioCostoCalculado * 1.3).toFixed(2)
        );
        const nuevoPrecioVenta =
          prev.precioVenta < precioCostoCalculado
            ? precioVentaSugerido
            : Math.max(prev.precioVenta, precioCostoCalculado);

        return {
          ...prev,
          tiempoEstimadoMinutos: totalTiempoEstimado,
          precioCosto: precioCostoCalculado,
          precioVenta: nuevoPrecioVenta,
        };
      }
    });
  }, [formThreeValues, insumos, isEditing]);

  return { calcularPrecioCosto, calcularTiempoEstimado };
};
