import {
  initialValuesStepOnePromocion,
  initialValuesStepTwoPromocion,
  initialValuesStepThreePromocion,
} from './promocion'

export const INITIAL_VALUES_PROMOCION_CREATE = {
  stepOne: initialValuesStepOnePromocion,
  stepTwo: initialValuesStepTwoPromocion,
  stepThree: initialValuesStepThreePromocion,
}

export const STEP_NAVIGATION = {
  PREVIOUS: -1,
  NEXT: 1,
} as const

export const BUTTON_TEXTS_PROMOCION = {
  CREATE: {
    STEP_1_2_3: 'Siguiente',
    STEP_4: 'Crear Promoción',
    BACK: 'Volver',
  },
  EDIT: {
    STEP_1_2_3: 'Siguiente',
    STEP_4: 'Guardar Cambios',
    BACK: 'Volver',
  },
} as const
