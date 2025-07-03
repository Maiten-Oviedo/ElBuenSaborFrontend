"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/common/components/modal/Modal";
import { editarEmpleadoSchema } from "@/schemas/empleadoSchema";
import { useEmpleadoStore } from "@/store/storeEmpleados";
import { EmpleadoUpdate, IEmpleado } from "@/common/types/entities/IEmpleado";
import MyForm from "@/common/components/form/MyForm";
import { IRol } from "@/common/types/entities/IRol";
import { FormField } from "@/common/types/form.types";
import { useAuthStore } from "@/store/useAuthStore";

const initialValues: EmpleadoUpdate = {
  nombre: "",
  apellido: "",
  telefono: "",
  email: "",
  activo: true,
  rolId: 0,
};

const getEditarEmpleadoFields = (roles: IRol[]): FormField[] => [
  {
    name: "nombre",
    label: "Nombre",
    type: "text",
  },
  {
    name: "apellido",
    label: "Apellido",
    type: "text",
  },
  {
    name: "telefono",
    label: "Teléfono",
    type: "text",
  },
  {
    name: "email",
    label: "Correo electrónico",
    type: "email",
  },
  {
    name: "rolId",
    label: "Rol",
    type: "select",
    options: roles.map((rol) => ({
      label: rol.rolName,
      value: rol.id!,
    })),
  },
  {
    name: "activo",
    label: "Estado",
    type: "checkbox",
  },
];

export default function EditarEmpleadoModal() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [empleado, setEmpleado] = useState<IEmpleado | null>(null);

  const { updateEmpleado, fetchEmpleadoById, roles, fetchRoles } =
    useEmpleadoStore.getState();

  const usuario = useAuthStore((state) => state.empleado);
  const setUsuario = useAuthStore((state) => state.setEmpleado);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchRoles();
        const data = await fetchEmpleadoById(Number(id));

        if (data) {
          setEmpleado(data);
        }
      } catch (error) {
        console.error("Error obteniendo datos:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleSubmit = async (values: EmpleadoUpdate) => {
    try {
      await updateEmpleado(Number(id), values);

      router.back();
    } catch (error) {
      console.error("Error actualizando empleado:", error);
      alert("Hubo un problema al actualizar el empleado");
    }
  };

  useEffect(() => {
    if (usuario) {
      console.log(usuario);
    }
  }, [id]);

  if (loading || !empleado) {
    return (
      <Modal>
        <p className="text-white text-center">Cargando empleado...</p>
      </Modal>
    );
  }

  return (
    <Modal>
      <h2 className="text-white text-3xl font-bold text-center mb-4">
        EDITAR EMPLEADO
      </h2>

      <MyForm
        initialValues={{
          nombre: empleado.nombre || "",
          apellido: empleado.apellido || "",
          telefono: empleado.telefono || "",
          email: empleado.email || "",
          activo: empleado.activo ?? true,
          rolId: empleado.rol?.id ?? 0,
        }}
        validationSchema={editarEmpleadoSchema}
        onSubmit={handleSubmit}
        fields={getEditarEmpleadoFields(roles)}
        textButton="Guardar Cambios"
        textLeftButton="Cancelar"
      />
    </Modal>
  );
}
