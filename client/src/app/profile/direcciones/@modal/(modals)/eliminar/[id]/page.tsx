"use client";

import DeleteItemAlert from "@/common/components/ui/DeleteItemAlert";
import ParallelModal from "@/common/components/ui/parallel-modal/ParallelModal";
import { useAuthStore } from "@/common/store/useAuthStore";
import { useParams } from "next/navigation";

const EliminarDireccion = () => {
  const params = useParams();
  const direccionId = params?.id as string;
  const clienteId = useAuthStore((state) => state.cliente?.id);
  const endpoint = `cliente/${clienteId}/domicilios`;

  return (
    <ParallelModal>
      <DeleteItemAlert
        id={direccionId}
        endpoint={endpoint}
        labelForElement={"calle"}
      />
    </ParallelModal>
  );
};

export default EliminarDireccion;
