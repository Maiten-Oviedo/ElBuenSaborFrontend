'use client'

import { useState } from 'react'
import type { FormikErrors, FormikHelpers } from 'formik'
import { FormStepOneValues, FormStepThreeValues, FormStepTwoValues } from '../types/form.types'

export const usePromocionForm = (initialValues: {
  stepOne: FormStepOneValues
  stepTwo: FormStepTwoValues
  stepThree: FormStepThreeValues
}) => {
  const [formOneValues, setFormOneValues] = useState(initialValues.stepOne)
  const [formTwoValues, setFormTwoValues] = useState(initialValues.stepTwo)
  const [formThreeValues, setFormThreeValues] = useState(initialValues.stepThree)
  const [tempFormThreeValues, setTempFormThreeValues] = useState(initialValues.stepThree)

  const [currentStep, setCurrentStep] = useState<number>(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmitStepOne = async (
    values: FormStepOneValues,
    formikHelpers: FormikHelpers<FormStepOneValues>
  ) => {
    const errors = await formikHelpers.validateForm()
    if (Object.keys(errors).length === 0) {
      setFormOneValues(values)
      setCurrentStep(2)
    }
  }

  const handleSubmitStepTwo = async (
    values: FormStepTwoValues,
    formikHelpers: FormikHelpers<FormStepTwoValues>
  ) => {
    const errors = await formikHelpers.validateForm()
    if (Object.keys(errors).length === 0) {
      setFormTwoValues(values)
      setCurrentStep(3)
    }
  }

  const handleSubmitStepThree = async (
    values: FormStepThreeValues,
    formikHelpers: FormikHelpers<FormStepThreeValues>
  ) => {
    const errors = await formikHelpers.validateForm()
    if (Object.keys(errors).length === 0) {
      setFormThreeValues(values)
      setTempFormThreeValues(values)
      // Aquí podrías lanzar una petición final si ya estás en el último paso
    }
  }

  const handleFormThreeChange = (values: FormStepThreeValues) => {
    setTempFormThreeValues(values)
    setFormThreeValues(values)
  }

  const handleBackFromStepThree = () => {
    setFormThreeValues(tempFormThreeValues)
    setCurrentStep(2)
  }

  const handleSubmitPromocion = async (finalValues: FormStepThreeValues) => {
    setLoading(true)
    setError(null)

    try {
      const formatHora = (hora: Date | string) =>
        typeof hora === 'string' ? hora : hora.toLocaleTimeString('it-IT')

      const body = {
        ...formOneValues,
        productosSeleccionados: formTwoValues.productosSeleccionados,
        ...finalValues,
        horaDesde: formatHora(finalValues.horaDesde),
        horaHasta: formatHora(finalValues.horaHasta),
        imagenesUrls: formOneValues.imagenesUrls,
      }

      console.log('📦 Enviando promoción:', body)
      setLoading(false)
      return body
    } catch (err) {
      console.error('❌ Error al enviar promoción:', err)
      setError('Ocurrió un error al guardar la promoción.')
      setLoading(false)
    }
  }

  return {
    // Estados y setters
    formOneValues,
    formTwoValues,
    formThreeValues,
    tempFormThreeValues,
    currentStep,
    loading,
    error,
    setFormOneValues,
    setFormTwoValues,
    setFormThreeValues,
    setTempFormThreeValues,
    setCurrentStep,
    setLoading,
    setError,

    // Handlers
    handleSubmitStepOne,
    handleSubmitStepTwo,
    handleSubmitStepThree,
    handleFormThreeChange,
    handleBackFromStepThree,
    handleSubmitPromocion
  }
}
