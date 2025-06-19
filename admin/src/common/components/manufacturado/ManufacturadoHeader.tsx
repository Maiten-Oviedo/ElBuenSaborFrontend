interface ManufacturadoHeaderProps {
  currentStep: number
  productName?: string
  isEditing?: boolean
}

export const ManufacturadoHeader = ({
  currentStep,
  productName,
  isEditing = false,
}: ManufacturadoHeaderProps) => {
  const getTitle = () => {
    if (isEditing) {
      return currentStep !== 3
        ? `Editar ${productName}`
        : `Editar ${productName}:`
    }
    return currentStep !== 3 ? 'CREAR PRODUCTO' : 'CREAR PRODUCTO:'
  }

  return (
    <div className="flex flex-col min-h-15 items-center justify-center text-center text-white text-3xl font-extrabold">
      <h3 className={currentStep === 3 ? 'mt-5' : ''}>{getTitle()}</h3>
      {currentStep === 3 && <p>RECETA</p>}
    </div>
  )
}
