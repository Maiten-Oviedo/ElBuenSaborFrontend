'use client'
import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { MyFormProps } from '@/common/types/MyFormProps'
import Button from '../Button'

function MyForm<TValues extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  loading = false,
  error: err,
  onSubmit,
  fields,
  textButton = 'Enviar',
  typeButton = 'submit',
  textLeftButton = 'Cancelar',
  onButtonClick = () => {},
  onLeftButtonClick,
  onChange,
}: MyFormProps<TValues>) {
  const router = useRouter()

  return (
    <Formik<TValues>
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {formikHelpers => {
        const { errors, touched, values } = formikHelpers

        return (
          <Form className="w-full grid grid-cols-2 gap-6 items-end">
            {fields.map((field, index) => {
              const {
                name,
                label,
                type,
                id,
                placeholder,
                className: fieldClassName,
                options,
              } = field

              return (
                <div
                  key={name}
                  className={`${
                    fields.length === 1 ||
                    (fields.length % 2 === 1 && index === fields.length - 1)
                      ? 'col-span-2 flex justify-center'
                      : 'flex flex-col w-full'
                  }`}
                >
                  <div className="flex flex-col w-full max-w-md">
                    <label htmlFor={id ?? name} className="text-white">
                      {label}:
                    </label>

                    {type === 'select' ? (
                      <>
                        <Field
                          as="select"
                          id={id ?? name}
                          name={name}
                          className={`mb-4 rounded-full p-2 bg-white text-black ${
                            errors[name as keyof TValues] &&
                            touched[name as keyof TValues]
                              ? 'border-red-500 border-2'
                              : 'border-gray-300'
                          } ${fieldClassName}`}
                          onChange={(e: React.ChangeEvent<any>) => {
                            formikHelpers.handleChange(e) // actualiza Formik
                            field.onChange?.(e) // ejecuta onChange personalizado si existe

                            //lógica para resetear el select si cambia el país o provincia
                            if (name === 'pais') {
                              formikHelpers.setFieldValue('provincia', '')
                              formikHelpers.setFieldValue('localidad', '')
                            }

                            if (name === 'provincia') {
                              formikHelpers.setFieldValue('localidad', '')
                            }
                          }}
                        >
                          <option disabled value="">
                            Seleccionar
                          </option>
                          {options?.map((option, index) => (
                            <option
                              key={index}
                              value={option.value}
                              className="text-zinc-900"
                            >
                              {option.label}
                            </option>
                          ))}
                        </Field>
                      </>
                    ) : (
                      <>
                        <Field
                          id={id ?? name}
                          name={name}
                          type={type}
                          placeholder={placeholder}
                          className={`mb-4 rounded-full p-2 bg-white text-black ${
                            errors[name as keyof TValues] &&
                            touched[name as keyof TValues]
                              ? 'border-red-500 border-2'
                              : ''
                          } ${fieldClassName}`}
                        />
                      </>
                    )}

                    <ErrorMessage
                      name={name}
                      component="div"
                      className="text-red-500 w-full text-sm text-center font-semibold"
                    />
                  </div>
                </div>
              )
            })}

            {err && <p className="col-span-2 text-sm text-red">{err}</p>}

            <div className="flex justify-around items-center col-span-2">
              {!loading && (
                <Button
                  variant="primary"
                  onClick={onLeftButtonClick ?? (() => router.back())}
                >
                  {textLeftButton}
                </Button>
              )}
              <Button
                variant="secondary"
                type={typeButton}
                onClick={() =>
                  onButtonClick?.(formikHelpers, formikHelpers.values)
                }
                className=""
              >
                {loading ? 'Cargando...' : textButton}
              </Button>
            </div>

            {/* <div className="col-span-2">
              <pre className="text-white text-xs bg-black p-2 rounded-md">
                {JSON.stringify(values, null, 2)}
              </pre>
            </div> */}
          </Form>
        )
      }}
    </Formik>
  )
}

export default MyForm
