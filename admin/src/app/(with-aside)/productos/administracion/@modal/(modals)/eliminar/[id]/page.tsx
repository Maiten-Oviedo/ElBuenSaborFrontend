'use client'
import DeleteItemAlert from '@/common/components/deleteItemAlert/DeleteItemAlert'
import Modal from '@/common/components/modal/Modal'
import { useStoreManufacturados } from '@/store/storeManufacturados'
import { useParams } from 'next/navigation'
import React from 'react'

const endpoint = 'articulo-manufacturado'

export default function DeletePage() {
  const params = useParams()
  const id = params?.id as string
  const { remove } = useStoreManufacturados()

  return (
    <Modal>
      <DeleteItemAlert
        id={id}
        endpoint={endpoint}
        deleteFunction={() => remove(Number(id))}
      />
    </Modal>
  )
}
