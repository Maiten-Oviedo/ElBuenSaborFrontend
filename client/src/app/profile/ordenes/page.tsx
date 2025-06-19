"use client";
import GenericTable from "@/common/components/ui/genericTable/GenericTable";
import httpClient from "@/common/lib/httpClient";
import { useAuthStore } from "@/common/store/useAuthStore";
import { ICliente } from "@/common/types/entitites/ICliente";
import { IDomicilio } from "@/common/types/entitites/IDomicilio";
import { IPedido } from "@/common/types/entitites/IPedido";
import React, { useEffect, useState } from "react";
import { RxReload } from "react-icons/rx";
import { useMemo } from "react";
import Link from "next/link";

export const ordersTableColumns = [
  { label: "N° Orden", key: "id" },
  { label: "fecha", key: "fechaPedido" },
  { label: "Dirección", key: "direction" },
  { label: "Estado Pedido", key: "estadoEnum" },
  { label: "Estado de Pago", key: "estadoPagoEnum" },
  { label: "Acciones", key: "acciones" },
];

interface MyOrder extends IPedido {
  domicilio: IDomicilio;
  direction: string;
}
const Ordenes = () => {
  const cliente = useAuthStore((state) => state.cliente) as ICliente;
  const [misOrdenes, setMisOrdenes] = useState<IPedido[]>([]);
  const [domicilios, setDomicilios] = useState<IDomicilio[]>([]);

  const data: MyOrder[] = useMemo(() => {
    if (!misOrdenes || !domicilios) return [];

    console.log(domicilios);

    return misOrdenes.map((pedido) => {
      console.info("ID PEDIDO DOMICILIO: ", pedido.domicilioId);
      const domicilio = domicilios.find((d) => d.id === pedido.domicilioId);

      return {
        ...pedido,
        domicilio: domicilio!,
        direction: domicilio
          ? `${domicilio.calle} ${domicilio.numero || ""}, ${
              domicilio.localidad?.nombre
            }`
          : "No encontrada",
      };
    });
  }, [misOrdenes, domicilios]);

  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReload = () => {
    setReloadTrigger(!reloadTrigger);
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setError(null);
        setLoading(true);

        if (!cliente || !cliente.id) {
          setError("Cliente no autenticado.");
          return;
        }

        const misOrdenes = (await httpClient().get(
          `http://localhost:8080/pedido/cliente/${cliente.id}`
        )) as IPedido[];

        const response = (await httpClient().get(
          `http://localhost:8080/cliente/${cliente.id}/domicilios`
        )) as IDomicilio[];

        setDomicilios(response);
        setMisOrdenes(misOrdenes);
      } catch (e: unknown) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    if (cliente && cliente.id) {
      fetchOrders();
    }
  }, [reloadTrigger, cliente]);

  return (
    <div className="bg-black h-[70vh] rounded-3xl flex flex-col items-center justify-start gap-8 p-8">
      <nav className="flex flex-row gap-4 items-center justify-center">
        <h1 className="text-white text-5xl montserrat font-black">
          MIS ÓRDENES
        </h1>
        <button onClick={handleReload} className="cursor-pointer ">
          <RxReload color="white" size={30} className="hover:scale-105" />
        </button>
      </nav>
      {loading && <p>Cargando tus pedidos...</p>}
      {!loading && error && (
        <p className="text-red">
          Error al cargar tus pedidos y sus direcciones. {error}
        </p>
      )}

      {!loading && !error && misOrdenes.length === 0 && (
        <>
          <article className="flex flex-col justify-center items-center w-full h-full gap-2">
            <p className="text-2xl text-center w-full text-red font-semibold">
              No Tienes Pedidos Realizados
            </p>
            <Link
              href={"/menu"}
              className="bg-white text-lg font-semibold rounded-full px-4 py-1 text-red text-center"
            >
              Ver Menú
            </Link>
          </article>
        </>
      )}
      {misOrdenes.length > 0 && (
        <article className="flex w-full justify-center">
          <GenericTable<MyOrder>
            dataType="mis-ordenes"
            columns={ordersTableColumns}
            data={data}
            isLoading={loading}
            error={error}
            section="administracion"
          />
        </article>
      )}
    </div>
  );
};

export default Ordenes;
