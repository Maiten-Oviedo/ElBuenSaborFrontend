'use client'
import React, { useEffect } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { MyFormProps } from '@/common/types/MyFormProps'

function CartForm<TValues extends Record<string, unknown>>({
  initialValues,
  error: err,
  fields,
  onSubmit = () => {},
  onChange,
  validationSchema,
}: MyFormProps<TValues>) {
  return (
    <Formik<TValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {formikHelpers => {
        const { errors, touched, values } = formikHelpers

        useEffect(() => {
          if (onChange) onChange(values)
        }, [values, onChange])

        return (
          <Form className="w-full grid grid-cols-2 gap-6">
            {fields.map(field => {
              const {
                name,
                label,
                type,
                id,
                disabled,
                placeholder,
                className: fieldClassName,
                options,
              } = field

              return (
                <div key={name} className="flex flex-col w-full">
                  <label htmlFor={id ?? name} className="text-white">
                    {label}:
                  </label>

                  {type === 'select' ? (
                    <>
                      <Field
                        as="select"
                        id={id ?? name}
                        name={name}
                        disabled={disabled}
                        className={`mb-4 rounded-full p-2 bg-white text-black
                          ${
                            errors[name as keyof TValues] &&
                            touched[name as keyof TValues]
                              ? 'border-red-500 border-2'
                              : 'border-gray-300'
                          } ${fieldClassName}`}
                      >
                        <option value="" disabled>
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
                        disabled={disabled}
                        className={`mb-4 rounded-full p-2
                          ${
                            disabled
                              ? 'bg-gray-300 italic text-gray-800 cursor-not-allowed'
                              : 'bg-white text-black'
                          }
                          ${
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
              )
            })}

            {err && <p className="col-span-2 text-sm text-red">{err}</p>}

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

export default CartForm
