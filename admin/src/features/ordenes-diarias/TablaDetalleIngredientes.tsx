"use client";

import { IArticuloInsumo } from '@/common/types/entities/IArticuloInsumo';
import { IArticuloManufacturadoDetalle } from '@/common/types/entities/IManufacturadoDetalle';
import { IPedido } from '@/common/types/entities/IPedido';
import { usePedidoStore } from '@/store/storePedidos';
import React, { useEffect, useState } from 'react';

type Props = {
  pedido: IPedido;
  estadoActual: string;
};

const TablaDetalle = ({ pedido, estadoActual }: Props) => {
  const ingredientesPorArticulo = usePedidoStore((state) => state.ingredientesPorArticulo);
  const setIngredientesPorArticulo = usePedidoStore((state) => state.setIngredientesPorArticulo);
  const [insumos, setInsumos] = useState<IArticuloInsumo[]>([]);

  useEffect(() => {
    const fetchInsumos = async () => {
      try {
        const resInsumos = await fetch("http://localhost:8080/articulo-insumo/getAll");
        if (resInsumos.ok) {
          const data = await resInsumos.json();
          setInsumos(data);
        } else {
        }
      } catch (error) {
        console.error("Error en fetch insumos:", error);
      }
    };

    if (insumos.length === 0) {
      fetchInsumos();
    }
  }, []);

  useEffect(() => {
    const fetchIngredientes = async () => {
      if (insumos.length === 0) {
        return;
      }

      const nuevoMapa: typeof ingredientesPorArticulo = {};
      const articuloIds = Array.from(new Set(pedido.listaDetalle.map((d) => d.articuloId)));


      const fetches = articuloIds.map(async (id) => {

        try {
          const res = await fetch(`http://localhost:8080/articulo-manufacturado/get/${id}`);
          if (!res.ok) throw new Error(`Error HTTP al obtener artículo ${id}`);

          const articulo = await res.json();

          if (!Array.isArray(articulo.articuloManufacturadoDetalle)) {
            return;
          }

          const ingredientes: IArticuloManufacturadoDetalle[] = articulo.articuloManufacturadoDetalle.map((ing: IArticuloManufacturadoDetalle) => ({
            id: ing.id,
            articuloInsumoId: ing.articuloInsumoId,
            articuloDenominacion: ing.articuloDenominacion,
            cantidad: ing.cantidad
          }));


          if (ingredientes.length > 0) {
            nuevoMapa[id] = ingredientes;
          }
        } catch (err) {
          console.log(`No se encontraron ingredientes para el item ${id}`);
        }
      });

      await Promise.all(fetches);

      if (Object.keys(nuevoMapa).length > 0) {
        setIngredientesPorArticulo({ ...ingredientesPorArticulo, ...nuevoMapa });
      }
    };

    fetchIngredientes();
  }, [pedido, insumos]);


  // ---- Render ----

  if (estadoActual === 'PREPARACION') {
    return (
      <div className="w-full max-w-xl mx-auto h-80 overflow-y-scroll scroll-smooth snap-y snap-mandatory">
        <div className="space-y-3 p-3">
          {pedido.listaDetalle.map((detalle, i) => {
            const ingredientes = ingredientesPorArticulo[detalle.articuloId];

            return (
              <div key={i} className="bg-white shadow-sm snap-center rounded-xl p-4">
                <h3 className="text-lg font-semibold mb-2">
                  X{detalle.cantidad} - {detalle.articuloDenominacion}
                </h3>

                {/* Lista de ingredientes necesarios para este artículo manufacturado */}
                {ingredientes && ingredientes.length > 0 ? (
                  <ul className="text-md w-full space-y-1 ">
                    {ingredientes.map((ing) => {
                      const insumo = insumos.find(ins => ins.id === ing.articuloInsumoId);
                      const unidad = insumo?.unidadMedidaEnum ?? '';

                      return (
                        <li key={ing.id} className='flex w-full flex-row justify-between border-b-2 border-gray-200'>
                          <div>{ing.articuloDenominacion}</div> {ing.cantidad * detalle.cantidad} {unidad}
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
      <div className="w-full max-w-lg mx-auto h-80 overflow-y-scroll scroll-smooth snap-y snap-mandatory flex flex-col justify-center">
        <div className="space-y-3 p-3">
          {pedido.listaDetalle.map((detalle, i) => (
              <div key={i} className="bg-white shadow-sm snap-center rounded-xl p-4 flex justify-between">
                <h3 className="text-lg font-semibold mb-2">
                  X{detalle.cantidad} - {detalle.articuloDenominacion}
                </h3>
                {estadoActual === 'PENDIENTE' || estadoActual === 'TERMINADOS' &&
                <h3>Subtotal: ${detalle.subTotal}</h3>
                }
                </div>
            )
        )}
        </div>
      </div>
    )
  }
}


export default TablaDetalle;
