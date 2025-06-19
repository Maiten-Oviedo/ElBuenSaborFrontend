'use client'

import { useState, useEffect } from 'react'
import httpClient from '@/common/lib/httpClient'
import { ICategoria } from '../types/entities/ICategoria'

export const useCategorias = () => {
  const [categorias, setCategorias] = useState<ICategoria[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getCategorias = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await httpClient().get(
        'http://localhost:8080/categoria/getAll'
      )
      setCategorias(response as ICategoria[])
    } catch (error) {
      setError((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  const getCategoriaById = async (id: number): Promise<ICategoria | null> => {
    try {
      const response = await httpClient().get(
        `http://localhost:8080/categoria/${id}`
      )
      return response as ICategoria
    } catch (error) {
      console.error('Error al obtener categoría:', error)
      return null
    }
  }

  useEffect(() => {
    getCategorias()
  }, [])

  return {
    categorias,
    loading,
    error,
    getCategorias,
    getCategoriaById,
  }
}
