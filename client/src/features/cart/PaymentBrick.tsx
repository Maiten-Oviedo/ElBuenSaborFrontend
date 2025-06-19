import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    MercadoPago: any;
  }
}

const PaymentBrick = ({ pedidoId }: { pedidoId: number }) => {
  const brickContainerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => setIsReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    setError(null);
    if (!isReady || !brickContainerRef.current) return;

    const mp = new window.MercadoPago(
      "APP_USR-67fd5276-47b9-4393-8e42-fb936b3a1e0e",
      { locale: "es-AR" }
    );

    const loadBrick = async () => {
      setLoading(true);
      try {
        // Pido la preferencia para este pedidoId
        const res = await fetch(
          "http://localhost:8080/payment/create-preference",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(pedidoId),
          }
        );

        console.log(res);
        if (!res.ok) throw new Error(`${res.status}`);

        const { preferenceId, totalPedido } = await res.json();

        const bricksBuilder = mp.bricks();
        bricksBuilder.create("wallet", "paymentBrickContainer", {
          initialization: {
            amount: totalPedido,
            preferenceId: preferenceId,
          },
          customization: {
            paymentMethods: {
              ticket: "all",
              creditCard: "all",
              prepaidCard: "all",
              debitCard: "all",
              mercadoPago: "all",
            },
          },
          callbacks: {
            onReady: () => console.log("Payment Brick listo"),
          },
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Error al crear el pago: ${err.message}`);
        } else {
          setError("Error desconocido.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadBrick();
  }, [isReady, pedidoId]);

  if (loading)
    return (
      <button className="w-[280px] h-[48px] rounded-lg bg-[#009ee3] mt-[5px] flex justify-center items-center">
        Cargando...
      </button>
    );

  if (error)
    return (
      <button className="w-[280px] h-[48px] rounded-lg bg-[#e30f00] text-white mt-[16px]">
        {error}
      </button>
    );

  return <div id="paymentBrickContainer" ref={brickContainerRef}></div>;
};

export default PaymentBrick;
