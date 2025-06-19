import { useState } from "react";
import { useRouter } from "next/router"; // o useNavigate en React Router
import { IDomicilio } from "@/common/types/entitites/IDomicilio";

const DireccionesSelect = ({
  domicilios,
  onSelect,
}: {
  domicilios: IDomicilio[];
  onSelect: () => void;
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter(); // cambiar por useNavigate si usás React Router

  return (
    <div className="relative w-64">
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-left"
      >
        Seleccionar dirección
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          {/* Opción para agregar nueva dirección */}
          <div
            className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-blue-600 font-medium flex items-center gap-2"
            onClick={() => router.push("/profile/domicilios")}
          >
            ➕ Agregar nueva dirección
          </div>

          {/* Lista de domicilios */}
          {domicilios.map((dom, i) => (
            <div
              key={i}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                onSelect(dom);
                setOpen(false);
              }}
            >
              `${domicilio.calle} ${domicilio.numero}, $
              {domicilio.localidadDenominacion} , CP ${domicilio.codigoPostal}`
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DireccionesSelect;
