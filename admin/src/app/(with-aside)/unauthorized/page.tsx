import React from 'react'
import { FiAlertCircle } from 'react-icons/fi'

const page = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center  h-full text-white">
        <article className="flex flex-col p-6 rounded-2xl items-center justify-center">
          <FiAlertCircle className="size-20" color="#bbb" />
          <h1 className="text-5xl text-center text-[#bbb] max-w-[700px]">
            No tienes autorización para ingresar a esta sección.
          </h1>
        </article>
      </section>
    </>
  )
}

export default page
