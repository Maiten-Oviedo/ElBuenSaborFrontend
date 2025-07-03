"use client";

import { IGenericTableProps } from "@/common/types/generic table/IGenericTableProps";
import Link from "next/link";
import { MdEdit } from "react-icons/md";
import { useState, useMemo } from "react";
import { FaCheck, FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import TableFilter from "./TableFilter";

export default function GenericTable<T>({
  dataType,
  columns,
  data,
  isLoading,
  error,
  section,
  esEstadistica = false,
}: IGenericTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchColumn, setSearchColumn] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);

  // Función para cambiar la configuración de orden
  const handleSort = (key: keyof T) => {
    if (sortConfig && sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({ key, direction: "asc" });
    }
  };

  const filteredData = useMemo(() => {
    let tempData = data;

    if (searchTerm) {
      tempData = tempData.filter((row) => {
        if (searchColumn === "all") {
          return columns.some((col) => {
            const value = row[col.key as keyof T];
            return value
              ?.toString()
              .toLowerCase()
              .includes(searchTerm.toLowerCase());
          });
        } else {
          const value = row[searchColumn as keyof T];
          return value
            ?.toString()
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        }
      });
    }

    if (roleFilter !== "all") {
      tempData = tempData.filter((row) => {
        const roleValue =
          typeof row["rol"] === "object"
            ? (row["rol"] as any)?.rolName
            : undefined;
        return roleValue === roleFilter;
      });
    }

    return tempData;
  }, [data, searchTerm, searchColumn, roleFilter, columns]);

  // Memo para ordenar los datos solo si cambia la configuración
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortConfig.direction === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      if (typeof aValue === "boolean" && typeof bValue === "boolean") {
        return sortConfig.direction === "asc"
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }

      return 0;
    });
  }, [filteredData, sortConfig]);

  return (
    <div className="flex flex-col justify-center items-center">
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      {!esEstadistica && (
        <TableFilter
          roleFilter={roleFilter}
          setRoleFilter={setRoleFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchColumn={searchColumn}
          setSearchColumn={setSearchColumn}
          columns={columns}
          dataType={dataType}
        />
      )}

      {/* Contenedor scrollable */}
      <div className="bg-[#DDD] min-w-[80%] max-h-[76vh] overflow-y-auto">
        <table className="text-black w-full table-auto">
          {/* Sticky header */}
          <thead className="bg-brown text-white sticky top-0 z-10">
            <tr>
              {columns.map((column) => (
                <th
                  className="border-x-1 border-x-[#c4c4c4] px-4 py-2 text-center cursor-pointer select-none bg-brown"
                  key={column.key}
                  onClick={() => handleSort(column.key as keyof T)}
                >
                  {column.label.toUpperCase()}
                  {sortConfig?.key === column.key && (
                    <span className="ml-1 text-[8px]">
                      {sortConfig.direction === "asc" ? " ▲" : " ▼"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={columns.length}>Cargando...</td>
              </tr>
            )}
            {!isLoading &&
              sortedData.length > 0 &&
              sortedData.map((row, indexRow: number) => (
                <tr className="hover:bg-gray-100" key={`${indexRow}-${row.id}`}>
                  {columns.map((col) => (
                    <td
                      key={col.label}
                      className="border-x-1 border-x-[#313131] border-y-1 border-y-[#c0c0c0b6] px-2 py-2 text-center text-wrap"
                    >
                      {col.key === "acciones" ? (
                        <div className="flex justify-around items-center">
                          {!col.render ? (
                            <>
                              <Link
                                href={
                                  section
                                    ? `/${dataType}/${section}/editar/${row.id}`
                                    : `/${dataType}/editar/${row.id}`
                                }
                                className="mr-2 hover:text-blue-800"
                              >
                                <MdEdit size={25} />
                              </Link>
                              {(row["activo"] === true ||
                                row["productoActivo"] === true) && (
                                <Link
                                  href={
                                    section
                                      ? `/${dataType}/${section}/eliminar/${row.id}`
                                      : `/${dataType}/eliminar/${row.id}`
                                  }
                                  className="mr-2 hover:text-red-800"
                                >
                                  <FaTrash size={20} />
                                </Link>
                              )}
                            </>
                          ) : (
                            col.render(row)
                          )}
                        </div>
                      ) : col.key === "viewMore" ? (
                        <Link
                          href={
                            section
                              ? `/${dataType}/${section}/viewMore/${row.id}`
                              : `/${dataType}/viewMore/${row.id}`
                          }
                        >
                          <p className="underline text-blue-800">Ver más</p>
                        </Link>
                      ) : col.key === "productoActivo" ||
                        col.key === "activo" ? (
                        <div
                          className={`w-full h-full flex justify-center items-center rounded-xl ${
                            row[col.key] === true
                              ? "bg-[#C5E6C1]"
                              : "bg-[#E6C1C1]"
                          }`}
                        >
                          {row[col.key] === true ? (
                            <FaCheck color="green" />
                          ) : (
                            <IoClose color="red" />
                          )}
                        </div>
                      ) : col.Cell ? (
                        col.Cell({ row })
                      ) : col.render ? (
                        col.render(row)
                      ) : (
                        (row[col.key as keyof typeof row] as React.ReactNode)
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
