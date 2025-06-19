"use client"

import { Modal } from '@/common/components/ui/Modal'
import Image from 'next/image'
import React, { useState } from 'react'

type Props = {}

const Seguridad = (props: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(true)

  return (
    <div className='bg-black h-[70vh] rounded-3xl flex flex-col items-start p-8'>
      <h1 className='text-white text-5xl montserrat font-bold'>SEGURIDAD</h1>
      <Modal isOpen={openModal} onClose={()=> setOpenModal(false)}>
       <Image
                alt="icono-triste"
                src="/svg/error.svg"
                width={150}
                height={150}
            />
            <h1 className='text-white font-extrabold'>¿Estás seguro que quieres eliminar tu cuenta?</h1>
            <h3 className='text-white font-light'>Esta acción no se podrá deshacer</h3>
            <div className='gap-5 flex'>
                <button className='bg-white border-2 border-white text-[#92140C] font-bold rounded-3xl px-7 py-1 cursor-pointer hover:bg-[#92140C] hover:text-white' onClick={()=> setOpenModal(false)}>Cancelar</button>
                <button className='bg-black border-2 border-[#92140C] text-white font-bold rounded-3xl px-7 py-1 cursor-pointer hover:bg-[#92140C] hover:text-white'>Si, eliminar</button>
            </div>
      </Modal>
    </div>
  )
}

export default Seguridad