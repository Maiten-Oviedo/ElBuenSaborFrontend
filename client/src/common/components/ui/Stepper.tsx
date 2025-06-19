export const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="relative w-full h-14 flex justify-center items-center mb-4">
      <div className="w-[80%] flex items-center justify-between">
        {/* Línea */}
        <div className="h-1.5 w-[80%] absolute z-0 bg-red-800" />
        <StepperCircle
          textCircle={1}
          bgColor={currentStep === 1 ? 'bg-white' : 'bg-red-800'}
          textColor={currentStep === 1 ? 'text-black' : 'text-white'}
          className={'z-10'}
        />

        <StepperCircle
          textCircle={2}
          bgColor={currentStep === 2 ? 'bg-white' : 'bg-red-800'}
          textColor={currentStep === 2 ? 'text-black' : 'text-white'}
          className={'z-10'}
        />

        <StepperCircle
          textCircle={3}
          bgColor={currentStep === 3 ? 'bg-white' : 'bg-red-800'}
          textColor={currentStep === 3 ? 'text-black' : 'text-white'}
          className={'z-10'}
        />
      </div>
    </div>
  )
}

const StepperCircle: React.FC<StepperCircleProps> = ({
  textCircle,
  bgColor,
  textColor,
  className,
}) => {
  return (
    <div
      className={`w-12 h-12 ${bgColor} ${textColor} ${className} rounded-full flex items-center justify-center text-sm font-bold`}
    >
      {textCircle}
    </div>
  )
}

type StepperCircleProps = {
  textCircle: string | number
  bgColor: string
  textColor: string
  className?: string
}
