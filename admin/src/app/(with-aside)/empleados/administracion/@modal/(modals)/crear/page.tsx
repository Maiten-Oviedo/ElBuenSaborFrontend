'use client'

import { useRouter } from 'next/navigation'
import { useFormik } from 'formik'
import { crearEmpleadoSchema } from "@/schemas/empleadoSchema"
import Modal from '@/common/components/modal/Modal'
import Button from '@/common/components/button/Button'
import { Roles } from '../../../../../../../../public/assets/Data/roles'

export default function CrearRolModal() {
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            telefono: '',
            email: '',
            password: '',
            repetirClave: '',
            rol: '',
        },
        validationSchema: crearEmpleadoSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: async (values) => {
            const rolSeleccionado = Roles.find(r => r.denominacion === values.rol)

            if (!rolSeleccionado) {
                alert("Rol inválido seleccionado")
                return
            }
            const dto = {
                nombre: values.nombre,
                apellido: values.apellido,
                telefono: values.telefono,
                email: values.email,
                password: values.password,
                rol: {
                    id: rolSeleccionado.id,
                    rolName: rolSeleccionado.denominacion,
                },
            }
            console.log(dto)

            try {
                // Verificamos si el email ya existe
                const res = await fetch(`http://localhost:8080/empleados/email/${values.email}`)

                if (res.ok) {
                    const text = await res.text()

                    if (text && text.trim().length > 0) {
                        const empleadoExistente = JSON.parse(text)

                        if (empleadoExistente.email === values.email) {
                            alert('Este correo ya está en uso')
                            return
                        }
                    }
                }
                // Enviamos el POST
                const response = await fetch('http://localhost:8080/empleados', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dto),
                })

                if (!response.ok) {
                    throw new Error(`Error en la creación: ${response.statusText}`)
                }

                console.log('Empleado creado con éxito')
                alert('Empleado creado con éxito')
                router.back()
                router.refresh()
            } catch (error) {
                console.error('Error validando o creando empleado:', error)
                alert('Ocurrió un error al crear el empleado')
            }
        }
    })

    const { values, errors, touched, handleChange, handleSubmit } = formik


    return (
        <Modal>
            <h2 className="text-white text-3xl font-bold text-center mb-4">CREAR EMPLEADO</h2>

            <form onSubmit={handleSubmit} className="w-full grid gap-4">
                {/* Nombre */}
                <InputCampo
                    name="nombre"
                    placeholder="Nombre"
                    value={values.nombre}
                    error={errors.nombre}
                    touched={touched.nombre}
                    onChange={handleChange}
                />

                {/* Apellidos */}
                <InputCampo
                    name="apellido"
                    placeholder="Apellido"
                    value={values.apellido}
                    error={errors.apellido}
                    touched={touched.apellido}
                    onChange={handleChange}
                />


                {/* Teléfono */}
                <InputCampo
                    name="telefono"
                    placeholder="Teléfono (10 dígitos)"
                    value={values.telefono}
                    error={errors.telefono}
                    touched={touched.telefono}
                    onChange={handleChange}
                />

                {/* Email */}
                <InputCampo
                    name="email"
                    placeholder="Correo electrónico"
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    onChange={handleChange}
                />

                {/* Contraseña */}
                <InputCampo
                    name="password"
                    type="password"
                    placeholder="Contraseña"
                    value={values.password}
                    error={errors.password}
                    touched={touched.password}
                    onChange={handleChange}
                />

                {/* Repetir Contraseña */}
                <InputCampo
                    name="repetirClave"
                    type="password"
                    placeholder="Repetir contraseña"
                    value={values.repetirClave}
                    error={errors.repetirClave}
                    touched={touched.repetirClave}
                    onChange={handleChange}
                />

                {/* Select Rol */}
                <div className="mb-4">
                    <select
                        name="rol"
                        value={values.rol}
                        onChange={handleChange}
                        className={`w-full rounded-full px-4 py-2 text-white border-2 ${errors.rol && touched.rol ? "border-red-500" : "border-white"
                            } bg-transparent`}
                    >
                        <option value="" className='text-black'>Selecciona un rol</option>
                        {Roles.map((rol) => (
                            <option key={rol.denominacion} value={rol.denominacion} className='text-black'>
                                {rol.denominacion}
                            </option>
                        ))}
                    </select>
                    {errors.rol && touched.rol && (
                        <p className="text-red-500 text-sm mt-1">{errors.rol}</p>
                    )}
                </div>

                {/* Botón crear */}
                <Button
                    type="submit"
                    className="bg-[#A11F1F] hover:bg-[#7e1a1a] text-white font-bold py-2 px-4 rounded-full w-full"
                >
                    Crear
                </Button>
            </form>
        </Modal>
    )
}
function InputCampo({
    name,
    type = "text",
    placeholder,
    value,
    error,
    touched,
    onChange,
}: any) {
    return (
        <div className="mb-2">
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`w-full rounded-full px-4 py-2 text-white border-2 ${error && touched ? "border-red-500" : "border-white"
                    } bg-transparent`}
            />
            {error && touched && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
}