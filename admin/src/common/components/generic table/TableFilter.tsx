import { useEmpleadoStore } from "@/store/storeEmpleados";
import { div } from "framer-motion/client";
import React, { useEffect, useState } from "react";

type Props = {
  searchColumn: string;
  columns: { key: string; label: string }[];
  dataType: string;
  searchTerm: string;
  setSearchColumn: (value: string) => void;
  setSearchTerm: (value: string) => void;
  roleFilter: string;
  setRoleFilter: (value: string) => void;
};

const TableFilter = ({
  searchColumn,
  setSearchColumn,
  columns,
  dataType,
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
}: Props) => {
  const { roles, fetchRoles, isLoading, error } = useEmpleadoStore();

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <div className="w-full flex justify-between">
      <div className="flex justify-start items-center w-[80%] mb-4 gap-4 self-start">
        <select
          value={searchColumn}
          onChange={(e) => setSearchColumn(e.target.value)}
          className="px-4 py-2 border border-gray-400 rounded"
        >
          <option value="all" className="text-black">
            Todas
          </option>
          {columns.map((col) => (
            <option
              key={String(col.key)}
              value={String(col.key)}
              className="text-black"
            >
              {col.label}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border border-gray-400 rounded w-[20%] text-white"
        />
      </div>
      <div>
        {dataType == "empleados" && (
          <div>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-400 rounded"
            >
              <option value="all" className="text-black">
                Todos los roles
              </option>
              {roles.map((col) => (
                <option
                  key={String(col.id)}
                  value={String(col.rolName)}
                  className="text-black"
                >
                  {col.rolName}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableFilter;
