"use client";

import { useEffect, useState, useMemo } from "react";
import { usePedidoStore } from "@/store/storePedidos";
import { Tabs } from "@/common/components/tabs/Tabs";
import AConfirmar from "@/features/ordenes-diarias/Tabs/AConfirmar";
import Cocina from "@/features/ordenes-diarias/Tabs/Cocina";
import Listos from "@/features/ordenes-diarias/Tabs/Listos";
import Entregados from "@/features/ordenes-diarias/Tabs/Entregados";
import Delivery from "@/features/ordenes-diarias/Tabs/Delivery";
import { useWebSocketPedidos } from "@/common/hooks/useWebSocketPedidos";
import httpClient from "@/common/lib/httpClient";
import { useAuthStore } from "@/store/useAuthStore";

const Page = () => {
  useWebSocketPedidos();
  const [error, setError] = useState<string>();
  const setPedidos = usePedidoStore((state) => state.setPedidos);
  const [currentTab, setCurrentTab] = useState("PENDIENTES");
  const user = useAuthStore(state => state.empleado);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await httpClient().get(
          "http://localhost:8080/pedido/diario/getAll"
        );

        setPedidos(response);
      } catch (error: unknown) {
        let errorMessage = "Error desconocido";

        if (error instanceof Error) {
          errorMessage = error.message;
        }

        setError(errorMessage);
      }
    };
    getData();
  }, [setPedidos]);

  // Definir qué roles pueden ver cada tab
  const tabAccess = {
    PENDIENTES: ["CAJERO", "ADMIN"],
    PREPARACION: ["COCINERO", "ADMIN"],
    TERMINADOS: ["CAJERO", "ADMIN"],
    EN_VIAJE: ["DELIVERY", "ADMIN"],
    ENTREGADOS: ["CAJERO", "COCINERO", "DELIVERY", "ADMIN"],
  };

  // Lista completa de tabs
  const allTabs = [
    { key: "PENDIENTES", label: "PENDIENTES", content: <AConfirmar />, color: "#AB2C21" },
    { key: "PREPARACION", label: "PREPARACION", content: <Cocina />, color: "#B85607" },
    { key: "TERMINADOS", label: "TERMINADOS", content: <Listos />, color: "#569F59" },
    { key: "EN_VIAJE", label: "EN VIAJE", content: <Delivery />, color: "#1875D1" },
    { key: "ENTREGADOS", label: "ENTREGADOS", content: <Entregados />, color: "#D1A018" },
  ];

  // Filtrar tabs según el rol del usuario
  const visibleTabs = useMemo(() => {
    if (!user?.rol) return [];
    return allTabs.filter(tab => tabAccess[tab.key as keyof typeof tabAccess].includes(user.rol));
  }, [user?.rol]);

  if (error) return null;

  return (
    <Tabs
      tabs={visibleTabs}
      currentTab={currentTab}
      onTabChange={(key) => setCurrentTab(key)}
    />
  );
};

export default Page;
