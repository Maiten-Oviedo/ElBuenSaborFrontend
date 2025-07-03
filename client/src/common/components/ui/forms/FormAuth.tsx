'use client'
import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { MyFormProps } from '@/common/types/MyFormProps'
import Button from '../Button'

function FormAuth<TValues extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  loading = false,
  error: err,
  onSubmit = () => {},
  fields,
  textButton = 'Enviar',
  typeButton = 'submit',
  onButtonClick = () => {},
  designInOneColumn = false,
  textColor,
}: MyFormProps<TValues>) {
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
          <Form
            className={`w-full ${
              designInOneColumn
                ? 'flex flex-col gap-2 items-center'
                : 'grid grid-cols-2 items-end gap-6'
            } `}
          >
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
                    (fields.length === 1 ||
                      (fields.length % 2 === 1 &&
                        index === fields.length - 1)) &&
                    !designInOneColumn
                      ? 'col-span-2 flex justify-center'
                      : 'flex flex-col w-full items-center'
                  }`}
                >
                  <div className="flex flex-col w-full max-w-md">
                    <Field
                      id={id ?? name}
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      className={`bg-none italic border-b-2 border-[#B9B9B9] w-full focus:outline-none focus:transition-all ${textColor} ${
                        textColor === 'text-white'
                          ? 'focus:border-b-white'
                          : 'focus:border-b-black'
                      }  ${
                        errors[name as keyof TValues] &&
                        touched[name as keyof TValues]
                          ? 'border-b-red-500 border-b-2'
                          : 'mb-4'
                      } ${fieldClassName}`}
                    />

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

            {/* Div para mostrar el objeto a medida que va cambiando */}
            {/* <div className="col-span-2">
              <pre className="text-white text-xs bg-black p-2 rounded-md">
                {JSON.stringify(values, null, 2)}
              </pre>
            </div> */}

            <div
              className={`flex justify-around items-center ${
                designInOneColumn ? 'gap-20' : 'col-span-2'
              }`}
            >
              <Button
                variant={textColor === 'white' ? 'secondary' : 'primary'}
                type={typeButton}
                onClick={() =>
                  onButtonClick?.(formikHelpers, formikHelpers.values)
                }
                className=""
              >
                {loading ? 'Cargando...' : textButton}
              </Button>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default FormAuth
