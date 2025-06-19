'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import Modal from '@/common/components/modal/Modal'
import MyForm from '@/common/components/form/MyForm'
import { Stepper } from '@/common/components/stepper/Stepper'
import FormProductosPromocion, { FormStepTwoPromocionValues } from '@/features/promociones/FormPromocion'

import { usePromocionForm } from '@/common/hooks/usePromocionForm'
import {
  crearPromocionSchemaStepOne,
  crearPromocionSchemaStepTwo,
  crearPromocionSchemaStepThree,
} from '@/schemas/crearPromocionSchema'

import {
  promocionFieldsStepOne,
  promocionFieldsStepThree,
} from '@/common/lib/constants/promocion'

import {
  initialValuesPromocion,
} from '@/common/lib/promocionUtils'

import { getProductosOptions, ProductoOption, usePromocion } from '@/common/hooks/usePromocion'
import { FormStepThreeValues } from '@/common/types/form.types'

export default function CrearPromocionModal() {
  const router = useRouter()
  const { createPromocion } = usePromocion()

  const [productosOptions, setProductosOptions] = useState<ProductoOption[]>([])

  useEffect(() => {
    getProductosOptions().then(setProductosOptions).catch(console.error)
  }, [])

  const {
    formOneValues,
    formTwoValues,
    formThreeValues,
    tempFormThreeValues,
    currentStep,
    loading,
    error,
    setCurrentStep,
    setLoading,
    setError,
    handleSubmitStepOne,
    handleSubmitStepTwo,
    handleSubmitStepThree,
    handleFormThreeChange,
    handleBackFromStepThree,
    setFormTwoValues,
    setFormThreeValues,
  } = usePromocionForm({
    stepOne: initialValuesPromocion.stepOne,
    stepTwo: initialValuesPromocion.stepTwo,
    stepThree: initialValuesPromocion.stepThree,
  })

  const handleFinalSubmit = async (values: FormStepThreeValues) => {
    console.log('🚀 Ejecutando submit final...')
    setLoading(true)
    setError(null)

    const result = await createPromocion(formOneValues,formTwoValues, values)

    setLoading(false)

    if (result.success) router.back()
    else setError('Error al crear la promoción.')
  }



  //Formateo para mostrar totales en el 3er paso
  const totalPrecioCosto = formTwoValues.productosSeleccionados.reduce(
    (acc, prod) => acc + prod.precioCosto * prod.cantidad,
    0
  )

  const totalPrecioVenta = formTwoValues.productosSeleccionados.reduce(
    (acc, prod) => acc + prod.precioVenta * prod.cantidad,
    0
  )

  return (
    <Modal>
      <div className="flex flex-col items-center justify-center text-white text-3xl font-extrabold mb-6">
        <h3>CREAR PROMOCIÓN</h3>
      </div>

      <Stepper currentStep={currentStep} totalSteps={3} />

      {currentStep === 1 && (
        <MyForm
          initialValues={formOneValues}
          validationSchema={crearPromocionSchemaStepOne}
          loading={loading}
          error={error}
          onSubmit={handleSubmitStepOne}
          fields={promocionFieldsStepOne}
          textButton="Siguiente"
          typeButton="submit"
          textLeftButton="Cancelar"
          onLeftButtonClick={() => router.back()}
        />
      )}

      {currentStep === 2 && (
        <FormProductosPromocion
          initialValues={formTwoValues}
          validationSchema={crearPromocionSchemaStepTwo}
          onSubmit={handleSubmitStepTwo}
          productosOptions={productosOptions}
          loading={loading}
          error={error}
          onFormChange={setFormTwoValues}
          textButton="Siguiente"
          textLeftButton="Atrás"
          onLeftButtonClick={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <>
          <div className="text-center mb-6">
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <p className="text-white text-lg font-semibold">
                Precio de Costo Total:
                <span className="text-green-400 font-bold"> ${totalPrecioCosto.toFixed(2)}</span>
              </p>
              <p className="text-white text-lg font-semibold mt-2">
                Precio de Venta Total:
                <span className="text-blue-400 font-bold"> ${totalPrecioVenta.toFixed(2)}</span>
              </p>
              <p className="text-gray-300 text-sm mt-2">
                Los totales se calculan automáticamente en base a los productos seleccionados.
              </p>
            </div>
          </div>
          <MyForm
            initialValues={tempFormThreeValues}
            validationSchema={crearPromocionSchemaStepThree}
            loading={loading}
            error={error}
            onSubmit={(values: FormStepThreeValues) => {
              handleFinalSubmit(values)
            }}
            onFormChange={handleFormThreeChange}
            fields={promocionFieldsStepThree}
            textButton="Crear Promoción"
            typeButton="submit"
            textLeftButton="Atrás"
            onLeftButtonClick={handleBackFromStepThree}
          />
        </>
      )}
    </Modal>
  )
}
