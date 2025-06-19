'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { crearEmpleadoSchema } from '@/schemas/empleadoSchema'
import Modal from '@/common/components/modal/Modal'
import Button from '@/common/components/button/Button'
import { Roles } from '../../../../../../../../../public/assets/Data/roles'

export default function EditarEmpleadoModal() {
  const router = useRouter()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)

  const formik = useFormik({
    initialValues: {
      nombre: '',
      apellido: '',
      telefono: '',
      email: '',
      rol: '',
    },
    validationSchema: crearEmpleadoSchema,
    onSubmit: async (values) => {
      try {
        await fetch(`http://localhost:8080/empleado/id/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, ...values }),
        })
        router.back()
      } catch (error) {
        console.error('Error actualizando empleado:', error)
      }
    },
    enableReinitialize: true,
  })

  const { values, errors, touched, handleChange, handleSubmit } = formik

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const res = await fetch(`http://localhost:8080/empleado/id/${id}`)
        const data = await res.json()

        formik.setValues({
          nombre: data.nombre || '',
          apellido: data.apellido || '',
          telefono: data.telefono || '',
          email: data.email || '',
          rol: data.rol || '',
        })

        setLoading(false)
      } catch (error) {
        console.error('Error obteniendo empleado:', error)
      }
    }

    if (id) fetchEmpleado()
  }, [id])

  if (loading) {
    return (
      <Modal>
        <p className="text-white text-center">Cargando empleado...</p>
      </Modal>
    )
  }

  return (
    <Modal>
      <h2 className="text-white text-3xl font-bold text-center mb-4">EDITAR EMPLEADO</h2>

      <form onSubmit={handleSubmit} className="w-full grid gap-4">
        <InputCampo name="nombre" placeholder="Nombre" {...bindField(formik, 'nombre')} />
        <InputCampo name="apellido" placeholder="Apellido" {...bindField(formik, 'apellido')} />
        <InputCampo name="telefono" placeholder="Teléfono" {...bindField(formik, 'telefono')} />
        <InputCampo name="email" placeholder="Email" {...bindField(formik, 'email')} />

        <div className="mb-4">
          <select
            name="rol"
            value={values.rol}
            onChange={handleChange}
            className={`w-full rounded-full px-4 py-2 text-white border-2 ${errors.rol && touched.rol ? "border-red-500" : "border-white"
              } bg-transparent`}
          >
            <option value="" className="text-black">Selecciona un rol</option>
            {Roles.map((rol) => (
              <option key={rol.denominacion} value={rol.denominacion} className="text-black">
                {rol.denominacion}
              </option>
            ))}
          </select>
          {errors.rol && touched.rol && (
            <p className="text-red-500 text-sm mt-1">{errors.rol}</p>
          )}
        </div>

        <Button
          type="submit"
        >
          Guardar Cambios
        </Button>
      </form>
    </Modal>
  )
}

// Input reusado
function InputCampo({ name, type = 'text', placeholder, value, onChange, error, touched }: any) {
  return (
    <div className="mb-2">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full rounded-full px-4 py-2 text-white border-2 ${error && touched ? 'border-red-500' : 'border-white'
          } bg-transparent`}
      />
      {error && touched && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

// Simplifica el acceso a formik
function bindField(formik: any, field: string) {
  return {
    value: formik.values[field],
    onChange: formik.handleChange,
    error: formik.errors[field],
    touched: formik.touched[field],
  }
}
