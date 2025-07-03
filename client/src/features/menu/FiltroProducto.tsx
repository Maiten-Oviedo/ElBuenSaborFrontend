import { FiltroMenu } from '@/common/types/FiltroMenu'
import React, { useState } from 'react'

interface Props {
  onFiltroChange: (filtro: FiltroMenu) => void
}

const FiltroProducto = ({ onFiltroChange }: Props) => {
  const [filtroSeleccionado, setFiltroSeleccionado] =
    useState<FiltroMenu>('TODO')

  const filtros: FiltroMenu[] = [
    'TODO',
    'HAMBURGUESAS',
    'SIDES',
    'BEBIDAS',
    'PROMOS',
    'OTROS', //En caso de filtro por otros
  ]

  const handleClick = (rubro: FiltroMenu) => {
    setFiltroSeleccionado(rubro)
    onFiltroChange(rubro)
  }

  return (
    <div className="flex text-white h-[150px] w-[80%] justify-around gap-6 montserrat font-bold text-2xl ">
      {filtros.map(filtro => (
        <React.Fragment key={filtro}>
          <button
            onClick={() => handleClick(filtro)}
            className={`
    relative
    flex flex-col items-center cursor-pointer justify-center
    w-[200px] h-full p-4 rounded-2xl text-[20px]
    ${filtroSeleccionado === filtro ? 'bg-[#0000008f]' : 'bg-[#00000051]'}
    ${
      filtroSeleccionado === filtro
        ? 'after:content-[""] after:absolute after:left-3 after:-bottom-1 after:w-[90%] after:h-[8px] after:bg-[#92140C]'
        : ''
    }
  `}
          >
            <img
              src={`/svg/menu/${filtro}.svg`}
              alt={`${filtro} icon`}
              className="w-16 h-16 mb-2"
            />
            {filtro}
          </button>
        </React.Fragment>
      ))}
    </div>
  )
}

export default FiltroProducto
