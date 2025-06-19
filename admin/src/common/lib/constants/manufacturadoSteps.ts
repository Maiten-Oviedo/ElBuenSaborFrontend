import {
  initialValuesStepOne,
  initialValuesStepTwo,
  initialValuesStepThree,
  initialValuesStepFour,
} from '@/common/lib/constants/manufacturado'

export const INITIAL_VALUES_CREATE = {
  stepOne: initialValuesStepOne,
  stepTwo: initialValuesStepTwo,
  stepThree: initialValuesStepThree,
  stepFour: initialValuesStepFour,
}

export const STEP_NAVIGATION = {
  PREVIOUS: -1,
  NEXT: 1,
} as const

export const BUTTON_TEXTS = {
  CREATE: {
    STEP_1_2_3: 'Siguiente',
    STEP_4: 'Crear Producto',
    BACK: 'Volver',
  },
  EDIT: {
    STEP_1_2_3: 'Siguiente',
    STEP_4: 'Guardar Cambios',
    BACK: 'Volver',
  },
} as const
