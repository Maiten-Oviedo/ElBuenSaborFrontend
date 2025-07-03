'use client'

import { useState } from 'react'
import type { FormikHelpers } from 'formik'
import type { FormThreeValues } from '@/features/modalManufacturado/FormRecetaManufacturado'
import {
  IStepFourValues,
  IStepOneValues,
  IStepTwoValues,
} from '../types/form.types'
import * as Yup from 'yup'
import { crearManufacturadoSchemaStepTwo } from '@/schemas/crearManufacturadoSchema'
import { IImagenArticulo } from '../types/entities/IImagenArticulo'

export const useManufacturadoForm = (initialValues: {
  stepOne: IStepOneValues
  stepTwo: IStepTwoValues
  stepThree: FormThreeValues
  stepFour: IStepFourValues
}) => {
  const [formOneValues, setFormOneValues] = useState(initialValues.stepOne)
  const [formTwoValues, setFormTwoValues] = useState<IStepTwoValues>(
    initialValues.stepTwo
  )
  const [formThreeValues, setFormThreeValues] = useState<FormThreeValues>(
    initialValues.stepThree
  )
  const [formFourValues, setFormFourValues] = useState(initialValues.stepFour)
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Estado temporal para el paso 3 - aquí guardamos los valores mientras el usuario edita
  const [tempFormThreeValues, setTempFormThreeValues] =
    useState<FormThreeValues>(initialValues.stepThree)

  const handleSubmitStepOne = (categoryId: number | null) => {
    console.log(categoryId)
    if (categoryId === null) return null
    setFormOneValues({ categoriaId: categoryId })
  }

  const handleSubmitStepThree = async (
    values: FormThreeValues,
    formikHelpers: FormikHelpers<FormThreeValues>
  ) => {
    const errors = await formikHelpers.validateForm()
    const isValid = Object.keys(errors).length === 0

    if (isValid) {
      // Guardar los valores confirmados
      setFormThreeValues(values)
      setTempFormThreeValues(values)
      setCurrentStep(4)
    }
  }

  // Función mejorada para manejar cambios en el paso 3
  const handleFormThreeChange = (values: FormThreeValues) => {
    // Guardar inmediatamente en el estado temporal
    setTempFormThreeValues(values)
    // También actualizar el estado principal para los cálculos
    setFormThreeValues(values)
  }

  // Función mejorada para navegar hacia atrás desde el paso 3
  const handleBackFromStepThree = () => {
    // Guardar los valores actuales antes de cambiar de paso
    setFormThreeValues(tempFormThreeValues)
    setCurrentStep(2)
  }

  // Función mejorada para navegar hacia adelante desde el paso 2
  const handleForwardToStepThree = () => {
    // Restaurar los valores guardados cuando volvemos al paso 3
    setCurrentStep(3)
  }

  function isIImagenArticuloArray(arr: any[]): arr is IImagenArticulo[] {
    return arr.length > 0 && typeof arr[0] === 'object' && 'url' in arr[0]
  }

  const validateStepTwo = async (
    values: Omit<IStepTwoValues, 'imagenesUrls'> & {
      imagenesUrls: (string | IImagenArticulo)[]
    },
    helpers: FormikHelpers<IStepTwoValues>,
    handleSubmitStepTwo: (values: IStepTwoValues) => void
  ) => {
    try {
      await crearManufacturadoSchemaStepTwo.validate(values, {
        abortEarly: false,
      })

      let imagenesUrlsFormatted: string[] | IImagenArticulo[] = []

      if (Array.isArray(values.imagenesUrls)) {
        if (isIImagenArticuloArray(values.imagenesUrls)) {
          imagenesUrlsFormatted = values.imagenesUrls
        } else {
          imagenesUrlsFormatted = values.imagenesUrls.map(url =>
            (url as string).trim()
          )
        }
      }

      handleSubmitStepTwo({
        denominacion: values.denominacion,
        descripcion: values.descripcion,
        productoActivo: values.productoActivo,
        imagenesUrls: imagenesUrlsFormatted,
        esVendible: values.esVendible ?? false,
      })
    } catch (error: unknown) {
      if (error instanceof Yup.ValidationError) {
        const errors: Partial<Record<keyof IStepTwoValues, string>> = {}
        error.inner.forEach(err => {
          if (err.path) errors[err.path as keyof IStepTwoValues] = err.message
        })
        helpers.setErrors(errors)
      }
    }
  }

  return {
    // States
    formOneValues,
    formTwoValues,
    formThreeValues,
    formFourValues,
    tempFormThreeValues, // Exponer el estado temporal
    currentStep,
    loading,
    error,
    // Setters
    setFormOneValues,
    setFormTwoValues,
    setFormThreeValues,
    setFormFourValues,
    setTempFormThreeValues,
    setCurrentStep,
    setLoading,
    setError,
    // Handlers
    handleSubmitStepOne,
    handleSubmitStepThree,
    handleFormThreeChange, // Nuevo handler
    handleBackFromStepThree, // Nuevo handler
    handleForwardToStepThree, // Nuevo handler
    validateStepTwo,
  }
}
