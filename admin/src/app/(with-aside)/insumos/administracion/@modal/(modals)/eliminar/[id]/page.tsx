'use client'
import DeleteItemAlert from '@/common/components/deleteItemAlert/DeleteItemAlert'
import Modal from '@/common/components/modal/Modal'
import { useInsumos } from '@/common/hooks/useInsumos'
import { useParams } from 'next/navigation'
import React from 'react'

const endpoint = 'articulo-insumo'

export default function DeletePage() {
  const params = useParams()
  const id = params?.id as string
  const { deleteInsumoById } = useInsumos()
  const handleDeleteInsumo = async () => {
    await deleteInsumoById(Number(id))
  }
  return (
    <Modal>
      <DeleteItemAlert
        id={id}
        endpoint={endpoint}
        deleteFunction={handleDeleteInsumo}
      />
    </Modal>
  )
}
