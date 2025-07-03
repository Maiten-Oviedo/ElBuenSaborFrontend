'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import httpClient from '@/common/lib/httpClient'
import { useAuthStore } from '@/store/useAuthStore'
import Modal from '@/common/components/modal/Modal'
import MyForm from '@/common/components/form/MyForm'
import { FormField } from '@/common/types/form.types'
import { editarMisDatosEmpleadoValidationSchema } from '@/schemas/profileSchema'
import { IUser, IUserResponse } from '@/common/types/entities/IUser'

type EmpleadoEditableFieldsType = {
  nombre: string
  apellido: string
  telefono: string
}

const editableFormFields: FormField[] = [
  {
    label: 'NOMBRE/S',
    name: 'nombre',
    type: 'text',
  },
  {
    label: 'APELLIDO/S',
    name: 'apellido',
    type: 'text',
  },
  {
    label: 'TELÉFONO',
    name: 'telefono',
    type: 'text',
  },
]

const EditarEmpleado = () => {
  const router = useRouter()

  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const setEmpleado = useAuthStore(state => state.setEmpleado)
  const empleado = useAuthStore(state => state.empleado)

  const [initialValues, setInitialValues] =
    useState<EmpleadoEditableFieldsType>({
      nombre: '',
      apellido: '',
      telefono: '',
    })

  useEffect(() => {
    if (empleado) {
      setInitialValues({
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        telefono: empleado.telefono || '-',
      })
    }
  }, [empleado])

  const handleSubmit = async (values: EmpleadoEditableFieldsType) => {
    try {
      setLoading(true)

      await httpClient().put(
        `http://localhost:8080/empleados/basic/${empleado?.id}`,
        {
          body: JSON.stringify(values),
        }
      )

      //Traemos el nuevo empleado del backend para más robustez
      const updatedEmpleado: IUserResponse = await httpClient().get(
        `http://localhost:8080/empleados/${empleado?.id}`
      )
      const updatedEmpleadoUser: IUser = {
        ...updatedEmpleado,
        rol: updatedEmpleado.rol.rolName,
      }

      // Y lo actualizamos en el store
      setEmpleado(updatedEmpleadoUser as IUser)
      router.back()
    } catch (error: unknown) {
      let errorMessage = 'Error desconocido'

      if (error instanceof Error) {
        errorMessage = error.message
      }

      setError(errorMessage)
      throw new Error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal>
      <div className="w-full h-full flex flex-col gap-10 items-center justify-center p-6">
        <h2 className="text-white font-black text-4xl text-center">
          EDITAR MI CUENTA
        </h2>
        {initialValues ? (
          <MyForm
            loading={loading}
            error={error}
            initialValues={initialValues}
            fields={editableFormFields}
            validationSchema={editarMisDatosEmpleadoValidationSchema}
            onSubmit={handleSubmit}
            textButton="Guardar"
            designInOneColumn={true}
          />
        ) : (
          <p className="text-white">Cargando datos...</p>
        )}
      </div>
    </Modal>
  )
}

export default EditarEmpleado
