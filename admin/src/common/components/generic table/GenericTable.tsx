'use client'

import { IGenericTableProps } from '@/common/types/generic table/IGenericTableProps'
import Link from 'next/link'
import { MdEdit } from 'react-icons/md'
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { FaTrash } from 'react-icons/fa'
import { useState, useMemo } from 'react'
import { FaCheck } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { IArticuloManufacturado } from '@/common/types/entities/IArticuloManufacturado'

export default function GenericTable<T>({
  dataType,
  columns,
  data,
  isLoading,
  error,
  section,
}: IGenericTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T
    direction: 'asc' | 'desc'
  } | null>(null)

  // Función para cambiar la configuración de orden
  const handleSort = (key: keyof T) => {
    if (sortConfig && sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      })
    } else {
      setSortConfig({ key, direction: 'asc' })
    }
  }

  // Memo para ordenar los datos solo si cambia la configuración
  const sortedData = useMemo(() => {
    if (!sortConfig) return data

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc'
          ? aValue - bValue
          : bValue - aValue
      }

      if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        return sortConfig.direction === 'asc'
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue)
      }

      return 0
    })
  }, [data, sortConfig])

  return (
    <div className="flex flex-col justify-center items-center">
      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}
      <table className="bg-[#DDD] min-w-[80%] max-h-[80%] p-10 text-black overflow-y-auto">
        <thead className="bg-brown text-white">
          <tr>
            {columns.map(column => (
              <th
                className="border-x-1 border-x-[#c4c4c4] px-4 py-2 text-center cursor-pointer select-none"
                key={column.key}
                onClick={() => handleSort(column.key as keyof T)}
              >
                {column.label.toUpperCase()}
                {sortConfig?.key === column.key && (
                  <span className="ml-1 text-[8px]">
                    {sortConfig.direction === 'asc' ? ' ▲' : ' ▼'}
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
              <tr className="hover:bg-gray-100" key={indexRow}>
                {columns.map(col => (
                  <td
                    key={col.label}
                    className="border-x-1 border-x-[#313131] border-y-1 border-y-[#c0c0c0b6] px-2 py-2 text-center"
                  >
                    {/* Acciones */}
                    {col.key === 'acciones' ? (
                      <div className="flex justify-around items-center">
                        <Link
                          href={`/${dataType}/${section}/editar/${row.id}`}
                          className="mr-2 hover:text-blue-800"
                        >
                          <MdEdit size={25} />
                        </Link>
                        <Link
                          href={`/${dataType}/${section}/eliminar/${row.id}`}
                          className="mr-2 hover:text-red-800"
                        >
                          <LuEye size={25}/>
                        </Link>
                      </div>

                    ) : col.key === 'productoActivo' ? (
                      // Estado booleano como chip visual
                      <div
                        className={`w-full h-full flex justify-center items-center rounded-xl ${row[col.key] === true ? 'bg-[#C5E6C1]' : 'bg-[#E6C1C1]'
                          }`}
                      >
                        {row[col.key] === true ? (
                          <FaCheck color="green" />
                        ) : (
                          <IoClose color="red" />
                        )}
                      </div>

                    ) : col.Cell ? (
                      // Soporte para Cell personalizado
                      col.Cell({ row })

                    ) : col.render ? (
                      // Compatibilidad con render clásico
                      col.render(row)

                    ) : (
                      // Renderiza valor por clave
                      row[col.key as keyof typeof row] as React.ReactNode
                    )}
                  </td>
                ))}


              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
