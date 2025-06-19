import { useEffect, useState } from "react";

type EstadisticasData = {
    movimientosData: any[];
    ventasPlatosData: any[];
    ventasBebidasData: any[];
    clientesData: any[];
    dateRange: DateRange;
    setDateRange: (range: DateRange) => void;
    currentTab: string;
    setCurrentTab: (tab: string) => void;
};

export type Movimiento = {
    fecha: string
    ingresoTotal: number
    costoTotal: number
    ganancia: number
}

export type DateRange = { startDate: Date; endDate: Date } | null;

export const useEstadisticasData = (): EstadisticasData => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState<DateRange>(null);
    const [currentTab, setCurrentTab] = useState<string>("movimientos");

    const [movimientosData, setMovimientosData] = useState<Movimiento[]>([]);
    const [ventasPlatosData, setVentasPlatosData] = useState<any[]>([]);
    const [ventasBebidasData, setVentasBebidasData] = useState<any[]>([]);
    const [clientesData, setClientesData] = useState<any[]>([]);

    useEffect(() => {
        const getQuery = () => {
            const inicio = (dateRange?.startDate ?? new Date('2000-01-01')).toISOString().split('T')[0];
            const fin = (dateRange?.endDate ?? new Date()).toISOString().split('T')[0];
            return `?fechaInicio=${inicio}&fechaFin=${fin}`;
        };


        const fetchData = async () => {
            const query = getQuery();
console.log(`http://localhost:8080/estadisticas/ranking-manufacturados${query}`)

            switch (currentTab) {
                case "movimientos":
                    {
                        const res = await fetch(`http://localhost:8080/estadisticas${query}`);
                        console.log("query" + query)
                        console.log(`http://localhost:8080/estadisticas${query}`)
                        const data = await res.json();
                        setMovimientosData(data);
                    }
                    break;
                case "ventas-platos":
                    {
                        const res = await fetch(`http://localhost:8080/estadisticas/ranking-manufacturados${query}`);
                        const data = await res.json();
                        setVentasPlatosData(data);
                    }
                    break;
                case "ventas-bebidas":
                    {
                        const res = await fetch(`http://localhost:8080/estadisticas/ranking-insumos${query}`);
                        const data = await res.json();
                        setVentasBebidasData(data);
                    }
                    break;
                case "clientes":
                    {
                        const res = await fetch(`http://localhost:8080/estadisticas/ranking-clientes${query}`);
                        const data = await res.json();
                        setClientesData(data);
                    }
                    break;
            }
        };

            fetchData();
        
    }, [dateRange, currentTab]);

    return {
        movimientosData,
        ventasPlatosData,
        ventasBebidasData,
        clientesData,
        dateRange,
        setDateRange,
        currentTab,
        setCurrentTab,
    };
};
