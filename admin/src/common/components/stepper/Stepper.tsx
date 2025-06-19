type StepperProps = {
  currentStep: number
  stepsLikeButtons?: boolean
  totalSteps: number
  handleClick?: (newStep: number) => void
}

export const Stepper = ({
  currentStep,
  stepsLikeButtons = false,
  totalSteps,
  handleClick = () => {},
}: StepperProps) => {
  //Crea un array dinámico con la cantidad de pasos indicada: [1,2,3,4]
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1)

  return (
    <div className="relative w-full h-14 flex justify-center items-center mb-4">
      <div className="w-[90%] flex items-center justify-between">
        {/* Línea de fondo */}
        <div className="h-1 w-[90%] absolute z-0 bg-red-800" />

        {steps.map(step => (
          <StepperCircle
            key={step}
            stepsLikeButtons={stepsLikeButtons}
            handleClick={() => handleClick(step)}
            textCircle={step}
            bgColor={currentStep === step ? 'bg-white' : 'bg-red-800'}
            textColor={currentStep === step ? 'text-black' : 'text-white'}
            gradientColor={
              currentStep === step
                ? 'bg-gradient-to-br from-gray-200 from-10% to-gray-500 to-80%'
                : 'bg-gradient-to-br from-[#ed9999] from-30% to-[#520000] to-60%'
            }
          />
        ))}
      </div>
    </div>
  )
}

const StepperCircle: React.FC<StepperCircleProps> = ({
  textCircle,
  bgColor,
  textColor,
  gradientColor,
  className,
  stepsLikeButtons,
  handleClick = () => {},
}) => {
  return (
    <button
      onClick={handleClick}
      className={`w-10 h-10 z-10 rounded-full p-[3px] font-bold ${
        stepsLikeButtons ? `${gradientColor}` : `${bgColor} ${textColor}`
      } `}
    >
      {stepsLikeButtons ? (
        <div
          className={`w-full h-full rounded-full flex items-center justify-center ${bgColor} ${textColor} font-bold cursor-pointer`}
        >
          {textCircle}
        </div>
      ) : (
        textCircle
      )}
    </button>
  )
}

type StepperCircleProps = {
  textCircle: string | number
  bgColor: string
  textColor: string
  gradientColor?: string
  className?: string
  stepsLikeButtons: boolean
  handleClick?: () => void
}
