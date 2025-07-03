'use client'
import DeleteItemAlert from '@/common/components/deleteItemAlert/DeleteItemAlert'
import Modal from '@/common/components/modal/Modal'
import { useStoreManufacturados } from '@/store/storeManufacturados'
import { useStorePromociones } from '@/store/storePromocion'
import { useParams } from 'next/navigation'
import React from 'react'

const endpoint = 'articulo-promocion'

export default function DeletePage() {
  const params = useParams()
  const id = params?.id as string
  const { remove } = useStorePromociones.getState()

  const handleDeletePromocion = async () => {
    console.log("ejecutada")
    await remove(Number(id))
  }

  return (
    <Modal>
      <DeleteItemAlert
endpoint={endpoint}
        id={id}
        deleteFunction={handleDeletePromocion}
      />
    </Modal>
  )
}
