"use client";

import { Tabs } from "@/common/components/tabs/Tabs";
import { Movimientos } from "@/features/estadisticas/Movimientos";
import RankingClientes from "@/features/estadisticas/RankingClientes";
import VentasBebidas from "@/features/estadisticas/VentasBebidas";
import { VentasPlatos } from "@/features/estadisticas/VentasPlatos";
import DateFilterCalendar from "@/common/components/calendar/DateFilterCalendar";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import { LuCalendarDays } from "react-icons/lu";
import * as XLSX from "xlsx";
import { useEstadisticasData } from "@/common/hooks/useEstadisticasData";
import { useState } from "react";

const Estadisticas = () => {
  const {
    movimientosData,
    ventasPlatosData,
    ventasBebidasData,
    clientesData,
    dateRange,
    setDateRange,
    currentTab,
    setCurrentTab,
  } = useEstadisticasData();

  const [isOpen, setIsOpen] = useState(false);

  const toggleCalendar = () => setIsOpen((prev) => !prev);
  const clearDateRange = () => setDateRange(null);

  const handleExport = () => {
    let dataToExport = [];
    let fileName = "";

    switch (currentTab) {
      case "movimientos":
        dataToExport = movimientosData;
        fileName = "estadisticas_movimientos";
        break;
      case "ventas-platos":
        dataToExport = ventasPlatosData;
        fileName = "estadisticas_ventas_platos";
        break;
      case "ventas-bebidas":
        dataToExport = ventasBebidasData;
        fileName = "estadisticas_ventas_directas";
        break;
      case "clientes":
        dataToExport = clientesData;
        fileName = "estadisticas_clientes";
        break;
    }

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Datos");
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };

  const formatRange = () => {
    if (!dateRange) return "Sin filtro de fecha";
    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    } as const;
    const from = dateRange.startDate.toLocaleDateString("es-AR", options);
    const to = dateRange.endDate.toLocaleDateString("es-AR", options);
    return from === to ? from : `${from} - ${to}`;
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b">
      <header className="top-0 z-10 mb-7">
        <div className="container flex h-16 items-start justify-between py-4">
          <h1 className="font-semibold text-white">ESTADÍSTICAS</h1>
          <div className="flex items-center gap-2 relative">
            {!isOpen ? (
              <div className="flex gap-5">
                <button
                  onClick={handleExport}
                  className="bg-white text-black text-sm px-4 rounded-sm border-gray-100 flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-200"
                >
                  <GoDownload /> Exportar en Excel
                </button>
                <button
                  onClick={clearDateRange}
                  className="bg-white text-black text-sm px-4 rounded-sm border-gray-100 flex items-center gap-3 py-2 cursor-pointer hover:bg-gray-200"
                >
                  <FaRegTrashAlt /> Borrar Selección
                </button>
                <button
                  onClick={toggleCalendar}
                  className="flex items-center text-sm gap-2 px-3 py-1 bg-white font-bold cursor-pointer text-black rounded hover:bg-gray-600 hover:text-white transition"
                >
                  <LuCalendarDays />
                  {formatRange()}
                </button>
              </div>
            ) : (
              <div className="absolute top-10 right-0 bg-white shadow-md rounded z-50">
                <DateFilterCalendar
                  dateRange={dateRange}
                  onChange={(range) => {
                    console.log("setDateRange ejecutado con:", range);
                    setDateRange(range); 
                  }}
                />
                <div className="flex justify-end p-2">
                  <button
                    onClick={toggleCalendar}
                    className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      <Tabs
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        tabs={[
          {
            label: "MOVIMIENTOS MONETARIOS",
            key: "movimientos",
            content: (
              <Movimientos
                movimientosData={movimientosData}
                dateRange={dateRange}
              />
            ),
            color: "#693B16",
          },
          {
            label: "VENTAS MANUFACTURADOS",
            key: "ventas-platos",
            content: (
              <VentasPlatos
                platosData={ventasPlatosData.slice(0, 10)}
                dateRange={dateRange}
              />
            ),
            color: "#672E00",
          },
          {
            label: "VENTAS DIRECTAS",
            key: "ventas-bebidas",
            content: (
              <VentasBebidas
                bebidasData={ventasBebidasData.slice(0, 10)}
                dateRange={dateRange}
              />
            ),
            color: "#47260C",
          },
          {
            label: "CLIENTES",
            key: "clientes",
            content: (
              <RankingClientes
                clientesData={clientesData.slice(0, 10)}
                dateRange={dateRange}
              />
            ),
            color: "#331802",
          },
        ]}
      />
    </div>
  );
};

export default Estadisticas;
