'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Modal from '@/common/components/modal/Modal'
import { crearEmpleadoSchema } from '@/schemas/empleadoSchema'
import { useEmpleadoStore } from '@/store/storeEmpleados'
import MyForm from '@/common/components/form/MyForm'
import { IRol } from '@/common/types/entities/IRol'
import { FormField } from '@/common/types/form.types'
import httpClient from '@/common/lib/httpClient'

const initialValues = {
  nombre: '',
  apellido: '',
  telefono: '',
  email: '',
  password: '',
  repetirClave: '',
  rolId: '',
}

const getEmpleadoFields = (roles: IRol[]): FormField[] => [
  {
    name: 'nombre',
    label: 'Nombre',
    type: 'text',
  },
  {
    name: 'apellido',
    label: 'Apellido',
    type: 'text',
  },
  {
    name: 'telefono',
    label: 'Teléfono',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Correo electrónico',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Contraseña',
    type: 'password',
  },
  {
    name: 'repetirClave',
    label: 'Repetir contraseña',
    type: 'password',
  },
  {
    name: 'rolId',
    label: 'Rol',
    type: 'select',
    options: roles.map(rol => ({
      label: rol.rolName,
      value: rol.id!,
    })),
  },
]

export default function CrearEmpleadoModal() {
  const router = useRouter()

  const fetchRoles = useEmpleadoStore(state => state.fetchRoles)
  const roles = useEmpleadoStore(state => state.roles)
  const { createEmpleado } = useEmpleadoStore.getState()

  useEffect(() => {
    const getRoles = async () => {
      await fetchRoles()
    }
    getRoles()
  }, [])

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const res = await httpClient().get(
        `http://localhost:8080/empleados/email/${values.email}`
      )

      if (res.email === values.email) {
        alert('Este correo ya está en uso')
        return
      }

      await createEmpleado({ ...values, rolId: Number(values.rolId) })

      alert('Empleado creado con éxito')
      router.back()
      router.refresh()
    } catch (error) {
      console.error('Error validando o creando empleado:', error)
      alert('Ocurrió un error al crear el empleado')
    }
  }

  return (
    <Modal>
      <h2 className="text-white text-3xl font-bold text-center mb-4">
        CREAR EMPLEADO
      </h2>

      {roles && (
        <MyForm
          initialValues={initialValues}
          validationSchema={crearEmpleadoSchema}
          onSubmit={handleSubmit}
          fields={getEmpleadoFields(roles)}
          textButton="Crear"
          textLeftButton="Cancelar"
        />
      )}
    </Modal>
  )
}
