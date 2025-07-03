"use client";

import { useInsumos } from "@/common/hooks/useInsumos";
import { IArticuloManufacturadoDetalle } from "@/common/types/entities/IManufacturadoDetalle";
import { IPedido } from "@/common/types/entities/IPedido";
import { useStoreManufacturados } from "@/store/storeManufacturados";
import { usePedidoStore } from "@/store/storePedidos";
import { useStorePromociones } from "@/store/storePromocion";
import React, { useEffect, useState } from "react";

type Props = {
  pedido: IPedido;
  estadoActual: string;
};

const TablaDetalle = ({ pedido, estadoActual }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ingredientesPorArticulo = usePedidoStore(
    (state) => state.ingredientesPorArticulo
  );
  const setIngredientesPorArticulo = usePedidoStore(
    (state) => state.setIngredientesPorArticulo
  );

  const { getInsumos, data: insumos } = useInsumos();

  const { data: manufacturados, getAll: getAllManufacturados } =
    useStoreManufacturados();

  const { getAll } = useStorePromociones.getState();
  const promociones = useStorePromociones((state) => state.data);

  useEffect(() => {
    const fetchInsumos = async () => {
      setError(null);
      setIsLoading(true);
      try {
        await getInsumos();
      } catch (e: unknown) {
        setError(
          `Error al traer la información actualizada. ${(e as Error).message}`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsumos();
  }, []);

  useEffect(() => {
    const fetchManufacturados = async () => {
      try {
        await getAllManufacturados();
      } catch (e: unknown) {
        console.error(
          `Error al traer los manufacturados: ${(e as Error).message}`
        );
      }
    };

    fetchManufacturados();
  }, []);

  useEffect(() => {
    const fetchPromociones = async () => {
      try {
        await getAll();
      } catch (e: unknown) {
        console.error(
          `Error al traer las promociones: ${(e as Error).message}`
        );
      }
    };

    fetchPromociones();
  }, []);

  // 👉 Unificar el mapeo de ingredientes
  useEffect(() => {
    if (insumos.length === 0 || manufacturados.length === 0) {
      return;
    }

    const nuevoMapa: typeof ingredientesPorArticulo = {};
    const articuloIds = Array.from(
      new Set(pedido.listaDetalle.map((d) => d.articuloId))
    );

    articuloIds.forEach((id) => {
      let ingredientes: IArticuloManufacturadoDetalle[] = [];

      // Buscar en manufacturados
      const articulo = manufacturados.find((a) => a.id === id);

      if (articulo && Array.isArray(articulo.articuloManufacturadoDetalle)) {
        ingredientes = articulo.articuloManufacturadoDetalle.map((ing) => ({
          id: ing.id,
          articuloInsumoId: ing.articuloInsumoId,
          articuloDenominacion: ing.articuloDenominacion,
          cantidad: ing.cantidad,
        }));
      }

      // Buscar en promociones
      const promocion = promociones.find((p) => p.id === id);
      if (promocion && promocion.promocionDetalle.length > 0) {
        promocion.promocionDetalle.forEach((detallePromo) => {
          const insumo = insumos.find(
            (ins) => ins.id === detallePromo.articuloId
          );

          if (insumo && insumo.id !== undefined) {
            // Es un insumo directo
            ingredientes.push({
              id: detallePromo.id,
              articuloInsumoId: insumo.id,
              articuloDenominacion: insumo.denominacion,
              cantidad: detallePromo.cantidad,
            });
          } else {
            // Buscar si es manufacturado
            const manufacturadoPromo = manufacturados.find(
              (m) => m.id === detallePromo.articuloId
            );
            if (manufacturadoPromo) {
              manufacturadoPromo.articuloManufacturadoDetalle.forEach((ing) => {
                ingredientes.push({
                  id: ing.id,
                  articuloInsumoId: ing.articuloInsumoId,
                  articuloDenominacion: ing.articuloDenominacion,
                  cantidad: ing.cantidad * detallePromo.cantidad, // Escalar cantidad
                });
              });
            }
          }
        });
      }

      if (ingredientes.length > 0) {
        nuevoMapa[id] = ingredientes;
      }
    });

    if (Object.keys(nuevoMapa).length > 0) {
      setIngredientesPorArticulo({
        ...ingredientesPorArticulo,
        ...nuevoMapa,
      });
    }
  }, [pedido, insumos, manufacturados, promociones]);

  // ---- Render ----
  if (estadoActual === "PREPARACION") {
    return (
      <div className="w-full max-w-xl min-h-30 max-h-60 py-10 overflow-y-scroll scroll-smooth snap-y snap-mandatory">
        <div className="space-y-3 p-3">
          {pedido.listaDetalle.map((detalle, i) => {
            const ingredientes = ingredientesPorArticulo[detalle.articuloId];

            return (
              <div
                key={i}
                className="bg-white shadow-sm snap-center rounded-xl p-4"
              >
                <h3 className="text-lg font-semibold mb-2">
                  X{detalle.cantidad} - {detalle.articuloDenominacion}
                </h3>

                {ingredientes && ingredientes.length > 0 ? (
                  <ul className="text-md w-full space-y-1 ">
                    {ingredientes.map((ing, index) => {
                      const insumo = insumos.find(
                        (ins) => ins.id === ing.articuloInsumoId
                      );
                      const unidad = insumo?.unidadMedidaEnum ?? "";

                      return (
                        <li
                          key={`${index}-${ing.id}`}
                          className="flex w-full flex-row justify-between border-b-2 border-gray-200"
                        >
                          <div>{ing.articuloDenominacion}</div>{" "}
                          {ing.cantidad * detalle.cantidad} {unidad}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No hay ingredientes para este artículo.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full max-w-lg mx-auto h-50 py-5 overflow-y-scroll scroll-smooth snap-y snap-mandatory flex flex-col justify-center">
        <div className="space-y-3 p-3 py-5 h-60">
          {pedido.listaDetalle.map((detalle, i) => (
            <div
              key={i}
              className="bg-white shadow-sm snap-center rounded-xl p-4 flex justify-between"
            >
              <h3 className="text-lg font-semibold mb-2">
                X{detalle.cantidad} - {detalle.articuloDenominacion}
              </h3>
              {estadoActual === "PENDIENTE" ||
                (estadoActual === "TERMINADOS" && (
                  <h3>Subtotal: ${detalle.subTotal}</h3>
                ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default TablaDetalle;
