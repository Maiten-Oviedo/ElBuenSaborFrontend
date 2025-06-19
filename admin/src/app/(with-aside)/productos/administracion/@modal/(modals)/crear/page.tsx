'use client'

import MyForm from '@/common/components/form/MyForm'
import Modal from '@/common/components/modal/Modal'
import { Stepper } from '@/common/components/stepper/Stepper'
import { useInsumos } from '@/common/hooks/useInsumos'
import httpClient from '@/common/lib/httpClient'
import type { IArticuloManufacturado } from '@/common/types/entities/IArticuloManufacturado'
import FormRecetaManufacturado from '@/features/modalManufacturado/FormRecetaManufacturado'
import {
  crearManufacturadoSchemaStepTwo,
  crearManufacturadoSchemaStepThree,
  crearManufacturadoSchemaStepFour,
} from '@/schemas/crearManufacturadoSchema'
import { useEffect } from 'react'
import { useStoreManufacturados } from '@/store/storeManufacturados'
import { useRouter } from 'next/navigation'
import {
  manufacturadoFieldsStepTwo,
  getManufacturadoFieldsStepFour,
} from '@/common/lib/constants/manufacturado'
import {
  BUTTON_TEXTS,
  INITIAL_VALUES_CREATE,
} from '@/common/lib/constants/manufacturadoSteps'
import {
  createInsumosOptions,
  transformStepTwoValues,
} from '@/common/lib/utils'
import { useManufacturadoCalculations } from '@/common/hooks/useManufacturadoCalculations'
import { useManufacturadoForm } from '@/common/hooks/useManufacturadoForm'
import { PrecioCostoDisplay } from '@/common/components/manufacturado/PrecioCostoDisplay'
import { ManufacturadoHeader } from '@/common/components/manufacturado/ManufacturadoHeader'
import CategorySelector from '@/common/components/categoriaSelector/CategoriaSelector'
import { useStoreCategoriasManufacturados } from '@/store/storeCategoriasManufacturados'
import Button from '@/common/components/button/Button'
import CategoriaSelector from '@/features/modalManufacturado/FormCategoriaManufacturado'

export default function CrearProductoModal() {
  const router = useRouter()
  const createManufacturado = useStoreManufacturados(state => state.create)

  // Hook para manejar insumos
  const { getInsumos } = useInsumos()

  const insumos = useInsumos().data

  // Hook personalizado para manejar el formulario
  const {
    formOneValues,
    formTwoValues,
    formThreeValues,
    formFourValues,
    tempFormThreeValues, // Usar el estado temporal
    currentStep,
    loading,
    error,
    setFormTwoValues,
    setFormFourValues,
    setCurrentStep,
    setLoading,
    setError,
    handleSubmitStepOne,
    handleSubmitStepThree,
    handleFormThreeChange, // Nuevo handler
    handleBackFromStepThree, // Nuevo handler
    validateStepTwo,
  } = useManufacturadoForm(INITIAL_VALUES_CREATE)

  // Hook personalizado para cálculos
  useManufacturadoCalculations(
    formThreeValues,
    insumos,
    setFormFourValues,
    false
  )

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getInsumos()
      } catch (error: unknown) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const insumosOptions = createInsumosOptions(insumos)

  const handleSubmitStepTwo = async (values: {
    denominacion: string
    imagenesUrlsInput: string
    descripcion: string
    productoActivo: string
  }) => {
    const transformedValues = transformStepTwoValues(values)
    setFormTwoValues(transformedValues)
    setCurrentStep(3)
  }

  const handleSubmitStepFour = async (
    values: typeof INITIAL_VALUES_CREATE.stepFour
  ) => {
    setError(null)
    setLoading(true)

    const completeManufacturado: IArticuloManufacturado = {
      ...formOneValues,
      ...formTwoValues,
      ...formThreeValues,
      ...values,
      productoActivo: formTwoValues.productoActivo === 'true',
    }

    try {
      await createManufacturado(completeManufacturado)
      router.back()
    } catch (error) {
      setError(
        `Error al crear el item. ${JSON.stringify(
          (error as Error).message
        )}:${JSON.stringify((error as Error).cause)}`
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal>
      <ManufacturadoHeader currentStep={currentStep} isEditing={false} />
      <Stepper currentStep={currentStep} totalSteps={4} />

      {currentStep === 1 && (
        <>
          <CategoriaSelector />
          <nav className="flex justify-between items-center">
            <Button
              onClick={() => router.back()}
              className="bg-white text-red hover:bg-gray-300 "
            >
              Cancelar
            </Button>
            <Button
              onClick={() => setCurrentStep(2)}
              className="bg-red text-white hover:bg-red-950"
            >
              Siguiente
            </Button>
          </nav>
        </>
      )}

      {currentStep === 2 && (
        <MyForm
          initialValues={formTwoValues}
          validationSchema={crearManufacturadoSchemaStepTwo}
          loading={loading}
          error={error}
          onSubmit={() => {}}
          fields={manufacturadoFieldsStepTwo}
          textButton={BUTTON_TEXTS.CREATE.STEP_1_2_3}
          typeButton="button"
          textLeftButton={BUTTON_TEXTS.CREATE.BACK}
          onButtonClick={(formikHelpers, values) =>
            validateStepTwo(values, formikHelpers, handleSubmitStepTwo)
          }
          onLeftButtonClick={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <FormRecetaManufacturado
          initialValues={tempFormThreeValues} // Usar el estado temporal que persiste
          validationSchema={crearManufacturadoSchemaStepThree}
          onSubmit={handleSubmitStepThree}
          insumosOptions={insumosOptions}
          textButton={BUTTON_TEXTS.CREATE.STEP_1_2_3}
          textLeftButton={BUTTON_TEXTS.CREATE.BACK}
          onLeftButtonClick={handleBackFromStepThree} // Usar el handler mejorado
          onFormChange={handleFormThreeChange} // Usar el handler mejorado
        />
      )}

      {currentStep === 4 && (
        <>
          <PrecioCostoDisplay
            precioCosto={formFourValues.precioCosto}
            isEditing={false}
          />
          <MyForm
            initialValues={formFourValues}
            validationSchema={crearManufacturadoSchemaStepFour(
              formFourValues.tiempoEstimadoMinutos,
              formFourValues.precioCosto
            )}
            loading={loading}
            error={error}
            onSubmit={values => {
              setFormFourValues(values)
              handleSubmitStepFour(values)
            }}
            fields={getManufacturadoFieldsStepFour(formFourValues.precioCosto)}
            textButton={BUTTON_TEXTS.CREATE.STEP_4}
            typeButton="submit"
            textLeftButton={BUTTON_TEXTS.CREATE.BACK}
            onLeftButtonClick={() => setCurrentStep(3)}
          />
        </>
      )}
    </Modal>
  )
}
