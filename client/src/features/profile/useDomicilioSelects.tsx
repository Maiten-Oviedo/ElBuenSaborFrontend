import { useEffect, useState } from "react";
import { IPais } from "@/common/types/entitites/IPais";
import { IProvincia } from "@/common/types/entitites/IProvincia";
import { ILocalidad } from "@/common/types/entitites/ILocalidad";
import httpClient from "@/common/lib/httpClient";

export const useDomicilioSelects = () => {
  const [paises, setPaises] = useState<IPais[]>([]);
  const [provincias, setProvincias] = useState<IProvincia[]>([]);
  const [localidades, setLocalidades] = useState<ILocalidad[]>([]);

  const [selectedPaisId, setSelectedPaisId] = useState<number | "">("");
  const [selectedProvinciaId, setSelectedProvinciaId] = useState<number | "">(
    ""
  );

  //Traer todos los países para el select
  useEffect(() => {
    const fetchPaises = async () => {
      const response = await httpClient().get("http://localhost:8080/paises");
      setPaises(response);
    };
    fetchPaises();
  }, []);

  //Traer todas las provincias para el select, dependiendo del país seleccionado
  useEffect(() => {
    if (!selectedPaisId) return;

    const fetchProvincias = async () => {
      const response = await httpClient().get(
        `http://localhost:8080/provincias/${selectedPaisId}`
      );
      setProvincias(response);
      //Al elegir una provincia, se reinician las localidades y la localidad previamente seleccionada
      setLocalidades([]);
      setSelectedProvinciaId("");
    };
    fetchProvincias();
  }, [selectedPaisId]);

  //Traer todas las localidades para el select, dependiendo de la provincia seleccionada
  useEffect(() => {
    if (!selectedProvinciaId) return;

    const fetchLocalidades = async () => {
      const response = await httpClient().get(
        `http://localhost:8080/localidades/${selectedProvinciaId}`
      );
      setLocalidades(response);
    };
    fetchLocalidades();
  }, [selectedProvinciaId]);

  const setInitialSelections = async ({
    paisId,
    provinciaId,
  }: {
    paisId: number;
    provinciaId: number;
  }) => {
    setSelectedPaisId(paisId);

    // Cargamos provincias y luego seteamos la provincia seleccionada
    const fetchedProvincias = await httpClient().get(
      `http://localhost:8080/provincias/${paisId}`
    );
    setProvincias(fetchedProvincias);
    setSelectedProvinciaId(provinciaId);

    // Cargamos localidades para esa provincia
    const fetchedLocalidades = await httpClient().get(
      `http://localhost:8080/localidades/${provinciaId}`
    );
    setLocalidades(fetchedLocalidades);
  };

  return {
    paises,
    provincias,
    localidades,
    selectedPaisId,
    selectedProvinciaId,
    setInitialSelections,
    onPaisChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
      setSelectedPaisId(Number(e.target.value)),
    onProvinciaChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
      setSelectedProvinciaId(Number(e.target.value)),
  };
};
