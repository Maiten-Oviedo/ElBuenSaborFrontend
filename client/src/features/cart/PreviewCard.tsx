import { useCartStore } from "@/common/store/useCartStore";
import { CartItem } from "@/common/types/CartItem";
import Image from "next/image";

interface PreviewCardProps {
  item: CartItem;
  showButton?: boolean;
}

const PreviewCard: React.FC<PreviewCardProps> = ({
  item,
  showButton = true,
}) => {
  const increaseQuantity = useCartStore((state) => state.increaseQuantity);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);

  return (
    <div className="border-b-1">
      <div className="flex items-center gap-5  ">
        <div className="w-full gap-0 flex items-center">
          <Image src={item.imagen!} alt="producto" height={110} width={110} />
          <div className="flex-col items-center">
            <h2 className="oi text-red-800 text-base">{item.denominacion}</h2>
            <h2 className="font-bold text-black">
              PRECIO: ${item.precioVenta}
            </h2>
          </div>
        </div>
        {showButton && (
          <div className="flex gap-2 items-center font-bold leading-5 text-center">
            <button
              onClick={() => decreaseQuantity(item.id!)}
              className="cursor-pointer bg-amber-800 px-3 py-0 rounded-full text-white font-bold text-xl"
            >
              -
            </button>
            <p className="text-black">{item.cantidad}</p>
            <button
              onClick={() => increaseQuantity(item.id!)}
              className="cursor-pointer bg-amber-800 px-3 py-0 rounded-full text-white font-bold text-xl"
            >
              +
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-md font-bold text-black">SUBTOTAL</p>
        <p className="font-bold text-xl text-black">
          ${item.cantidad * item.precioVenta}
        </p>
      </div>
    </div>
  );
};

export default PreviewCard;
