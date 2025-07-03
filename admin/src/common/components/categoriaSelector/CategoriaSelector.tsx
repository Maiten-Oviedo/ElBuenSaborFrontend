"use client";

import type { ICategoria } from "@/common/types/entities/ICategoria";
import { organizeCategoriesByType } from "@/common/utils/orderCatgories";
import { useState, useEffect } from "react";
import {
  BiChevronRight,
  BiChevronRightCircle,
  BiChevronRightSquare,
  BiHome,
  BiCheck,
} from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { IoTrashBinOutline } from "react-icons/io5";

interface CategorySelectorProps {
  categories: ICategoria[];
  selectedCategoryId?: number | null;
  onCategorySelect: (
    categoryId: number | null,
    categoryName: string | null
  ) => void;
  label?: string;
  placeholder?: string;
  error?: string;
}

export default function CategorySelector({
  categories,
  selectedCategoryId,
  onCategorySelect,
  label = "Categoría Padre",
  placeholder = "Seleccionar categoría padre",
  error,
}: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<ICategoria[]>([]);
  const [currentCategories, setCurrentCategories] = useState<ICategoria[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ICategoria | null>(
    null
  );

  // Organizar categorías al cargar
  useEffect(() => {
    if (categories.length > 0) {
      const { categoriesManufacturados, categoriesInsumos } =
        organizeCategoriesByType(categories);

      // Mostrar las categorías raíz inicialmente
      const rootCategories = [
        ...categoriesManufacturados.filter(
          (cat) => cat.categoriaPadre === null
        ),
        ...categoriesInsumos.filter((cat) => cat.categoriaPadre === null),
      ];

      setCurrentCategories(rootCategories);
    }
  }, [categories]);

  // Buscar categoría seleccionada al cargar
  useEffect(() => {
    if (selectedCategoryId && categories.length > 0) {
      const category = categories.find((cat) => cat.id === selectedCategoryId);
      if (category) {
        setSelectedCategory(category);
        buildPathToCategory(category);
      }
    }
  }, [selectedCategoryId, categories]);

  const buildPathToCategory = (category: ICategoria) => {
    const path: ICategoria[] = [];
    let current = category;

    while (current.categoriaPadre) {
      const parent = categories.find(
        (cat) => cat.id === current.categoriaPadre
      );
      if (parent) {
        path.unshift(parent);
        current = parent;
      } else {
        break;
      }
    }

    setCurrentPath(path);

    if (path.length > 0) {
      const lastParent = path[path.length - 1];
      const subcategories = categories.filter(
        (cat) => cat.categoriaPadre === lastParent.id
      );
      setCurrentCategories(subcategories);
    }
  };

  const navigateToCategory = (category: ICategoria) => {
    const subcategories = categories.filter(
      (cat) => cat.categoriaPadre === category.id
    );

    if (subcategories.length > 0) {
      setCurrentPath([...currentPath, category]);
      setCurrentCategories(subcategories);
    }
  };

  const navigateBack = () => {
    if (currentPath.length > 0) {
      const newPath = [...currentPath];
      newPath.pop();
      setCurrentPath(newPath);

      if (newPath.length > 0) {
        const lastParent = newPath[newPath.length - 1];
        const subcategories = categories.filter(
          (cat) => cat.categoriaPadre === lastParent.id
        );
        setCurrentCategories(subcategories);
      } else {
        const { categoriesManufacturados, categoriesInsumos } =
          organizeCategoriesByType(categories);
        const rootCategories = [
          ...categoriesManufacturados.filter(
            (cat) => cat.categoriaPadre === null
          ),
          ...categoriesInsumos.filter((cat) => cat.categoriaPadre === null),
        ];
        setCurrentCategories(rootCategories);
      }
    }
  };

  const navigateToRoot = () => {
    setCurrentPath([]);
    const { categoriesManufacturados, categoriesInsumos } =
      organizeCategoriesByType(categories);
    const rootCategories = [
      ...categoriesManufacturados.filter((cat) => cat.categoriaPadre === null),
      ...categoriesInsumos.filter((cat) => cat.categoriaPadre === null),
    ];
    setCurrentCategories(rootCategories);
  };

  const handleCategorySelect = (category: ICategoria | null) => {
    setSelectedCategory(category);
    onCategorySelect(category?.id || null, category?.denominacion || null);
    setIsOpen(false);
  };

  const handleSelectNone = () => {
    handleCategorySelect(null);
  };

  return (
    <div className="flex flex-col w-full max-w-md m-auto">
      <label className="text-white mb-2">{label}:</label>

      {/* Campo de selección */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full p-2 rounded-full bg-white text-black text-left flex justify-between items-center ${
            error ? "border-red-500 border-2" : "border-gray-300"
          }`}
        >
          <span className={selectedCategory ? "text-black" : "text-gray-500"}>
            {selectedCategory ? selectedCategory.denominacion : placeholder}
          </span>
          <BiChevronRight
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        </button>

        {/* Dropdown - Cambiado para que no se superponga */}
        {isOpen && (
          <div className="mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 w-full">
            {/* Header con breadcrumbs y navegación */}
            <div className="p-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              {/* Breadcrumbs */}
              {/* <div className="flex items-center gap-1 text-sm text-gray-600 mb-2 flex-wrap">
                {currentPath.map(category => (
                  <div
                    key={category.id}
                    className="flex items-center gap-1 shrink-0"
                  >
                    <BiChevronRightCircle className="w-3 h-3" />
                    <span className="text-gray-800 text-xs">
                      {category.denominacion}
                    </span>
                  </div>
                ))}
              </div> */}

              {/* Botones de navegación */}
              <div className="flex gap-2 flex-wrap">
                {currentPath.length > 0 && (
                  <button
                    type="button"
                    onClick={navigateBack}
                    className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-300 hover:bg-gray-400 rounded cursor-pointer"
                  >
                    <BsArrowLeft className="w-3 h-3" />
                    Volver
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleSelectNone}
                  className="px-2 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded cursor-pointer flex items-center gap-2"
                >
                  <FaTrash />
                  Eliminar Selección
                </button>
              </div>
            </div>

            {/* Lista de categorías */}
            <div className="max-h-60 overflow-y-auto">
              {currentCategories.length > 0 ? (
                currentCategories.map((category) => {
                  const hasSubcategories = categories.some(
                    (cat) => cat.categoriaPadre === category.id
                  );

                  return (
                    <div
                      key={category.id}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      {/* Información de la categoría */}
                      <div className="p-3 hover:bg-gray-50">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">
                              {category.denominacion}
                            </div>
                            {category.categoriaPadreDenominacion && (
                              <div className="text-sm text-gray-500">
                                Padre: {category.categoriaPadreDenominacion}
                              </div>
                            )}
                          </div>

                          {/* Botones de acción */}
                          <div className="flex gap-2 ml-2">
                            {/* Botón para navegar (solo si tiene subcategorías) */}
                            {hasSubcategories && (
                              <button
                                type="button"
                                onClick={() => navigateToCategory(category)}
                                className="flex items-center gap-1 px-2 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded cursor-pointer"
                                title="Ver subcategorías"
                              >
                                <BiChevronRightSquare className="w-4 h-4" />
                                Ver Rubros Hijos
                              </button>
                            )}

                            {/* Botón para seleccionar SIEMPRE disponible */}
                            <button
                              type="button"
                              onClick={() => handleCategorySelect(category)}
                              className="flex items-center gap-1 px-2 py-1 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded cursor-pointer"
                              title="Seleccionar esta categoría"
                            >
                              <BiCheck className="w-4 h-4" />
                              Seleccionar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No hay categorías disponibles en este nivel
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-500 text-sm text-center font-semibold mt-1">
          {error}
        </div>
      )}
    </div>
  );
}
