interface PrecioCostoDisplayProps {
  precioCosto: number
  isEditing?: boolean
}

export const PrecioCostoDisplay = ({
  precioCosto,
  isEditing = false,
}: PrecioCostoDisplayProps) => {
  return (
    <div className="text-center mb-6">
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <p className="text-white text-lg">
          <span className="font-semibold">Precio de Costo Calculado:</span>{' '}
          <span className="text-green-400 font-bold">
            ${precioCosto.toFixed(2)}
          </span>
        </p>
        <p className="text-gray-300 text-sm mt-2">
          Este precio se {isEditing ? 'recalcula' : 'calcula'} automáticamente
          en base a los ingredientes seleccionados
        </p>
      </div>
    </div>
  )
}
