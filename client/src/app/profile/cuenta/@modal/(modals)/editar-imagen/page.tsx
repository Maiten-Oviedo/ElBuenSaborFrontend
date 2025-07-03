"use client";

import ParallelModal from "@/common/components/ui/parallel-modal/ParallelModal";
import { useAuthStore } from "@/common/store/useAuthStore";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useReloadStore } from "@/common/store/useReloadStore";
import Image from "next/image";
import httpClient from "@/common/lib/httpClient";
import Button from "@/common/components/ui/Button";

const EditarCliente = () => {
  const router = useRouter();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cliente = useAuthStore((state) => state.cliente);
  const setCliente = useAuthStore((state) => state.setCliente);
  const toggleReload = useReloadStore((state) => state.toggleReload);

  useEffect(() => {
    if (cliente?.imagen) {
      setPreview(cliente.imagen);
    }
  }, [cliente]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !cliente?.id) return;

    const formData = new FormData();
    formData.append("archivo", selectedFile);

    try {
      setLoading(true);

      const updatedCliente = await httpClient().post(
        `http://localhost:8080/cliente/foto/${cliente.id}`,
        {
          body: formData,
        }
      );

      setCliente(updatedCliente);
      toggleReload();
      router.back();
    } catch (err: unknown) {
      setError((err as Error).message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ParallelModal>
      <div className="w-full h-full flex flex-col gap-10 items-center justify-center p-6">
        <h2 className="text-white font-black text-4xl text-center">
          EDITAR IMAGEN DE PERFIL
        </h2>

        {preview && (
          <Image
            src={preview}
            alt="preview"
            width={120}
            height={120}
            className="rounded-full object-cover"
          />
        )}

        {/* Input personalizado */}
        <div className="flex flex-col items-center gap-2">
          <input
            id="fileInput"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="fileInput"
            className="bg-gray-600 text-white rounded-sm px-4 py-2 cursor-pointer hover:bg-gray-800 transition-colors"
          >
            Seleccionar imagen
          </label>
          {selectedFile && (
            <p className="text-white text-sm">{selectedFile.name}</p>
          )}
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? "Subiendo..." : "Guardar"}
        </Button>
      </div>
    </ParallelModal>
  );
};

export default EditarCliente;
