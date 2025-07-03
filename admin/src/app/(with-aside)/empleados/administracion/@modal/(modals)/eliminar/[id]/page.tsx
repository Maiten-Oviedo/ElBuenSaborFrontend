'use client'
import DeleteItemAlertEmpleado from '@/common/components/deleteEmpleado/DeleteEmpledoAlert'
import DeleteItemAlertInsumo from '@/common/components/deleteItemAlertInsumo/DeleteItemAlertInsumo'
import Modal from '@/common/components/modal/Modal'
import { useInsumos } from '@/common/hooks/useInsumos'
import { useEmpleadoStore } from '@/store/storeEmpleados'
import { useParams } from 'next/navigation'
import React from 'react'


export default function DeletePage() {
  const params = useParams()
  const id = params?.id as string
  const { deleteEmpleado } = useEmpleadoStore.getState()


  const handleDeleteEmpleado = async () => {
    console.log("ejecutada")
    await deleteEmpleado(Number(id))
  }
  return (
    <Modal>
      <DeleteItemAlertEmpleado
        id={id}
        deleteFunction={handleDeleteEmpleado}
      />
    </Modal>
  )
}
