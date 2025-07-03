'use client'
import DeleteItemAlert from '@/common/components/deleteItemAlert/DeleteItemAlert'
import Modal from '@/common/components/modal/Modal'
import { useStoreCategoriasInsumos } from '@/store/storeCategoriasInsumos'
import { useParams } from 'next/navigation'
import React from 'react'

const endpoint = 'categoria'

export default function DeletePage() {
  const params = useParams()
  const id = params?.id as string
  const { deleteCategoria } = useStoreCategoriasInsumos()

  return (
    <Modal>
      <DeleteItemAlert
        id={id}
        endpoint={endpoint}
        deleteFunction={deleteCategoria}
      />
    </Modal>
  )
}
