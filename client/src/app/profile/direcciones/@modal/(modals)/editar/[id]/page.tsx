"use client";

import MyForm from "@/common/components/ui/forms/MyForm";
import ParallelModal from "@/common/components/ui/parallel-modal/ParallelModal";
import httpClient from "@/common/lib/httpClient";
import { editarDomicilioSchema } from "@/common/schemas/domicilioSchema";
import { useAuthStore } from "@/common/store/useAuthStore";
import { useReloadStore } from "@/common/store/useReloadStore";

import {
  DomicilioValues,
  getDomicilioFormFields,
} from "@/common/types/forms/crudDomicilioForms";
import { useDomicilioSelects } from "@/features/profile/useDomicilioSelects";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const EditarDomicilioModal = () => {
  const router = useRouter();
  const params = useParams();
  const idDomicilio = params?.id;
  const clienteId = useAuthStore((state) => state.cliente?.id);
  const toggleReload = useReloadStore((state) => state.toggleReload);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [initialValues, setInitialValues] = useState<DomicilioValues | null>(
    null
  );

  const {
    paises,
    provincias,
    localidades,
    onPaisChange,
    onProvinciaChange,
    setInitialSelections,
  } = useDomicilioSelects();

  useEffect(() => {
    const fetchDomicilio = async () => {
      try {
        setLoading(true);
        const domicilio = await httpClient().get(
          `http://localhost:8080/cliente/${clienteId}/domicilios/${idDomicilio}`
        );

        const values: DomicilioValues = {
          pais: domicilio.pais.id.toString(),
          provincia: domicilio.provincia.id.toString(),
          calle: domicilio.calle,
          numero: domicilio.numero,
          codigoPostal: domicilio.codigoPostal,
          localidad: domicilio.localidad.id.toString(),
          descripcion: domicilio.descripcion || "",
        };

        //Inicializa correctamente los selects
        setInitialSelections({
          paisId: domicilio.pais.id,
          provinciaId: domicilio.provincia.id,
        });

        setInitialValues(values);
      } catch (e: unknown) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (idDomicilio) fetchDomicilio();
  }, [idDomicilio]);

  const handleSubmit = async (values: DomicilioValues) => {
    const transformedValues = {
      calle: values.calle,
      numero: values.numero,
      codigoPostal: values.codigoPostal,
      localidadId: Number(values.localidad),
      descripcion: values.descripcion,
    };

    try {
      setLoading(true);

      await httpClient().put(
        `http://localhost:8080/cliente/${clienteId}/domicilios/${idDomicilio}`,
        {
          body: JSON.stringify(transformedValues),
        }
      );

      toggleReload();
      router.back();
    } catch (error: unknown) {
      let errorMessage = "Error desconocido";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParallelModal>
      <div className="w-full h-full flex flex-col gap-10 items-center justify-center">
        <h2 className="text-white font-black text-4xl text-center">
          EDITAR DOMICILIO
        </h2>
        {initialValues ? (
          <MyForm
            loading={loading}
            error={error}
            initialValues={initialValues}
            fields={getDomicilioFormFields(
              paises,
              provincias,
              localidades,
              onPaisChange,
              onProvinciaChange
            )}
            validationSchema={editarDomicilioSchema}
            onSubmit={handleSubmit}
            textButton="Guardar"
          />
        ) : (
          <p className="text-white">Cargando datos...</p>
        )}
      </div>
    </ParallelModal>
  );
};

export default EditarDomicilioModal;
