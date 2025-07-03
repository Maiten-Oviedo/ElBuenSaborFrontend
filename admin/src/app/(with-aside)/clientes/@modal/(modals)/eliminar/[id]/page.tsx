'use client'
import DeleteItemAlert from '@/common/components/deleteItemAlert/DeleteItemAlert'
import Modal from '@/common/components/modal/Modal'
import { useClientes } from '@/common/hooks/useClientes'
import { useParams } from 'next/navigation'
import React from 'react'

const endpoint = 'cliente'

export default function DeletePage() {
  const params = useParams()
  const id = params?.id as string
  const { deleteClienteById } = useClientes()

  const handleDeleteCliente = async () => {
    await deleteClienteById(Number(id))
  }
  return (
    <Modal>
      <DeleteItemAlert
        id={id}
        endpoint={endpoint}
        deleteFunction={handleDeleteCliente}
      />
    </Modal>
  )
}
