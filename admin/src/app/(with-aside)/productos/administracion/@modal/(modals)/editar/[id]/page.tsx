'use client'

import MyForm from '@/common/components/form/MyForm'
import Modal from '@/common/components/modal/Modal'
import { Stepper } from '@/common/components/stepper/Stepper'
import type { IArticuloManufacturado } from '@/common/types/entities/IArticuloManufacturado'
import FormRecetaManufacturado from '@/features/modalManufacturado/FormRecetaManufacturado'

import {
  crearManufacturadoSchemaStepTwo,
  crearManufacturadoSchemaStepThree,
  crearManufacturadoSchemaStepFour,
} from '@/schemas/crearManufacturadoSchema'
import { useEffect } from 'react'
import { useStoreManufacturados } from '@/store/storeManufacturados'
import { useParams, useRouter } from 'next/navigation'
import {
  manufacturadoFieldsStepTwo,
  getManufacturadoFieldsStepFour,
} from '@/common/lib/constants/manufacturado'
import { useInsumos } from '@/common/hooks/useInsumos'
import {
  createInsumosOptions,
  getInitialValuesForEdit,
  transformStepTwoValuesForEdit,
} from '@/common/lib/utils'
import { useManufacturadoForm } from '@/common/hooks/useManufacturadoForm'
import { useManufacturadoCalculations } from '@/common/hooks/useManufacturadoCalculations'
import { ManufacturadoHeader } from '@/common/components/manufacturado/ManufacturadoHeader'
import { BUTTON_TEXTS } from '@/common/lib/constants/manufacturadoSteps'
import { PrecioCostoDisplay } from '@/common/components/manufacturado/PrecioCostoDisplay'
import Button from '@/common/components/button/Button'
import CategoriaSelector from '@/features/modalManufacturado/FormCategoriaManufacturado'
import { IImagenArticulo } from '@/common/types/entities/IImagenArticulo'

export default function EditarProductoModal() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id
  const data = useStoreManufacturados(state => state.data)
  const updateManufacturado = useStoreManufacturados(state => state.update)

  const product = data.find(item => item.id === Number(id))

  if (product === undefined) {
    alert('Articulo no encontrado en la base de datos :(')
    router.back()
  }

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
    handleSubmitStepThree,
    handleFormThreeChange,
    handleBackFromStepThree,
    validateStepTwo,
  } = useManufacturadoForm(getInitialValuesForEdit(product!))

  // Hook personalizado para cálculos
  useManufacturadoCalculations(
    formThreeValues,
    insumos,
    setFormFourValues,
    true
  )

  useEffect(() => {
    const fetchData = async () => {
      await getInsumos()
    }
    fetchData()
  }, [])

  const insumosOptions = createInsumosOptions(insumos)

  const handleSubmitStepTwo = async (values: {
    denominacion: string
    imagenesUrls: IImagenArticulo[]
    descripcion: string
    productoActivo: string
  }) => {
    const transformedValues = transformStepTwoValuesForEdit(values, product!)
    setFormTwoValues(transformedValues)
    setCurrentStep(3)
  }

  const handleSubmitStepFour = async (values: any) => {
    setError(null)
    setLoading(true)

    const completeManufacturado: IArticuloManufacturado = {
      ...formOneValues,
      ...formTwoValues,
      ...formThreeValues,
      ...values,
      productoActivo: formTwoValues.productoActivo === 'true',
      id: product?.id,
    }
    console.log('EL BODY', completeManufacturado)

    try {
      updateManufacturado(completeManufacturado)
      router.back()
    } catch (error) {
      setError(
        `Error al editar el item. ${JSON.stringify(
          (error as Error).message
        )}:${JSON.stringify((error as Error).cause)}`
      )
    } finally {
      setLoading(false)
    }
  }

  const handleStepperButton = (newStep: number) => {
    setCurrentStep(newStep)
  }

  return (
    <Modal>
      <ManufacturadoHeader
        currentStep={currentStep}
        productName={product?.denominacion}
        isEditing={true}
      />
      <Stepper
        currentStep={currentStep}
        stepsLikeButtons={true}
        totalSteps={4}
        handleClick={handleStepperButton}
      />
      {currentStep === 1 && (
        <>
          <CategoriaSelector
            prevCategory={{
              id: product?.categoriaId,
              denominacion: product?.categoriaDenominacion,
            }}
          />
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
          textButton={BUTTON_TEXTS.EDIT.STEP_1_2_3}
          typeButton="button"
          textLeftButton={BUTTON_TEXTS.EDIT.BACK}
          onButtonClick={(formikHelpers, values) => {
            console.log('FORMIK HELPERS: ', formikHelpers)
            console.log('VALUES : ', values)
            validateStepTwo(values, formikHelpers, handleSubmitStepTwo)
          }}
          onLeftButtonClick={() => setCurrentStep(1)}
        />
      )}

      {currentStep === 3 && (
        <FormRecetaManufacturado
          initialValues={tempFormThreeValues} // Usar el estado temporal que persiste
          validationSchema={crearManufacturadoSchemaStepThree}
          onSubmit={handleSubmitStepThree}
          insumosOptions={insumosOptions}
          textButton={BUTTON_TEXTS.EDIT.STEP_1_2_3}
          textLeftButton={BUTTON_TEXTS.EDIT.BACK}
          onLeftButtonClick={handleBackFromStepThree} // Usar el handler mejorado
          onFormChange={handleFormThreeChange} // Usar el handler mejorado
        />
      )}

      {currentStep === 4 && (
        <>
          <PrecioCostoDisplay
            precioCosto={formFourValues.precioCosto}
            isEditing={true}
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
            textButton={BUTTON_TEXTS.EDIT.STEP_4}
            typeButton="submit"
            textLeftButton={BUTTON_TEXTS.EDIT.BACK}
            onLeftButtonClick={() => setCurrentStep(3)}
          />
        </>
      )}
    </Modal>
  )
}
