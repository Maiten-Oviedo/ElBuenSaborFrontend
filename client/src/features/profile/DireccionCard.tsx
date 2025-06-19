import { IDomicilio } from '@/common/types/entitites/IDomicilio'
import Link from 'next/link'
import { FaTrash } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { MdEdit } from 'react-icons/md'

type DireccionCardProps = {
  direccion: IDomicilio
}

export const DireccionCard: React.FC<DireccionCardProps> = ({ direccion }) => {
  return (
    <div className="w-full min-h-26 gap-1 flex flex-col justify-between items-center">
      <div className="w-full h-full flex mt-3">
        <div className="w-[10%] h-full flex items-center justify-center">
          <FaLocationDot color={'var(--color-red)'} size={50} />
        </div>
        <div className="w-[80%] h-full flex flex-col text-base text-white ml-5">
          <h3 className="text-xl font-bold">
            {`${direccion.calle} ${direccion.numero}, ${direccion.localidad.nombre}, ${direccion.provincia.nombre}, ${direccion.pais.nombre}`}
          </h3>
          <p className="text-gray-400">
            {direccion.descripcion ? direccion.descripcion : 'Sin descripción'}
          </p>
        </div>
        <div className="w-[10%] h-full flex items-center justify-end gap-4">
          <Link href={`/profile/direcciones/eliminar/${direccion.id}`}>
            <FaTrash color={'var(--color-red)'} size={30} />
          </Link>
          <Link href={`/profile/direcciones/editar/${direccion.id}`}>
            <MdEdit color={'white'} size={30} />
          </Link>
        </div>
      </div>
      <hr className="w-full text-white h-1" />
    </div>
  )
}
