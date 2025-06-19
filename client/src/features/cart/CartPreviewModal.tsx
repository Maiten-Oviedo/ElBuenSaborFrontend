import { useCartStore } from "@/common/store/useCartStore";
import PreviewCard from "./PreviewCard";
import Button from "@/common/components/ui/Button";
import Link from "next/link";

type CartPreviewModalProps = {
  showButton?: boolean;
  retiro?: string;
};

const CartPreviewModal = ({
  showButton = true,
  retiro = "",
}: CartPreviewModalProps) => {
  const total = useCartStore((state) => state.total);
  const items = useCartStore((state) => state.items);

  const descuento = total * 0.1;
  const costoEnvio = 1999;

  return (
    <div className="w-full h-full bg-white rounded-2xl flex flex-col justify-between overflow-hidden">
      {/* Header */}
      <div className="py-4 text-center border-b">
        <h1 className="text-2xl font-regular oi text-black">TU CARRITO</h1>
      </div>

      {/* Contenido scrolleable */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
        {items.map((item) => (
          <PreviewCard key={item.id} item={item} showButton={showButton} />
        ))}
      </div>

      {/* Descuento por retiro en local*/}
      <div className="flex justify-between px-4 mt-3 text-red-800 font-medium">
        {retiro === "TAKEAWAY" && (
          <>
            <p>Retiro en local</p>
            <p>-${descuento}</p>
          </>
        )}

        {retiro === "DELIVERY" && (
          // Costo de envío por retiro con delivery
          <>
            <p>Costo delivery</p>
            <p>+${costoEnvio}</p>
          </>
        )}
      </div>

      {/* Footer fijo abajo */}
      <div className="px-6 py-4 bg-white">
        <div className="flex justify-between text-xl font-bold mb-4 border-y-4 py-3 text-black">
          <h3>TOTAL:</h3>
          <h3>
            $
            {retiro === "TAKEAWAY"
              ? total - descuento
              : retiro === "DELIVERY"
              ? total + costoEnvio
              : total}
          </h3>
        </div>
        {showButton && (
          <Link href="/cart">
            <Button variant="primary" className="w-full">
              CONTINUAR COMPRA &gt;
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
export default CartPreviewModal;
