'use client'
import DeleteItemAlert from '@/common/components/deleteItemAlert/DeleteItemAlert'
import Modal from '@/common/components/modal/Modal'
import { useStoreCategoriasManufacturados } from '@/store/storeCategoriasManufacturados'
import { useParams } from 'next/navigation'
import React from 'react'

const endpoint = 'categoria'

export default function DeletePage() {
  const params = useParams()
  const id = params?.id as string
  const { deleteCategoria } = useStoreCategoriasManufacturados()

  return (
    <Modal>
      <DeleteItemAlert
        id={id}
        endpoint={endpoint}
        deleteFunction={() => deleteCategoria(Number(id))}
      />
    </Modal>
  )
}
