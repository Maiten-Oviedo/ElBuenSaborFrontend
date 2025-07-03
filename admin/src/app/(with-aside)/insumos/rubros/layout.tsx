import React from 'react'

const layout = ({
  children,
  modal, // ← aquí Next inyecta el contenido de @modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) => {
  return (
    <>
      <section className="w-full h-full">{children}</section>

      {modal}
    </>
  )
}

export default layout
