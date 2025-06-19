'use client'

import { useState } from 'react'
import type { FormikErrors, FormikHelpers } from 'formik'
import type { FormThreeValues } from '@/features/modalManufacturado/FormRecetaManufacturado'

export const useManufacturadoForm = (initialValues: {
  stepOne: any
  stepTwo: any
  stepThree: FormThreeValues
  stepFour: any
}) => {
  const [formOneValues, setFormOneValues] = useState(initialValues.stepOne)
  const [formTwoValues, setFormTwoValues] = useState(initialValues.stepTwo)
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

  const validateStepTwo = async (
    values: any,
    formikHelpers: FormikHelpers<any>,
    handleSubmitStepTwo: Function
  ) => {
    const sanitizedValues = {
      denominacion: values.denominacion || '',
      descripcion: values.descripcion || '',
      productoActivo: values.productoActivo || '',
      imagenesUrls: [],
    }

    // Si vienen URLs separadas por coma, las dividimos
    const inputUrls = values.imagenesUrlsInput
      ?.split(',')
      .map((url: string) => url.trim())
      .filter((url: string) => url !== '')

    if (Array.isArray(values.imagenesUrls)) {
      sanitizedValues.imagenesUrls = inputUrls.map(url => {
        // Buscamos si ya existía con ID
        const existente = values.imagenesUrls.find(
          (img: any) => img.url === url
        )
        return existente ? existente : { id: null, url }
      })
    } else {
      // fallback si no hay imagenes anteriores
      sanitizedValues.imagenesUrls = inputUrls.map(url => ({ id: null, url }))
    }
    handleSubmitStepTwo(sanitizedValues)
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
