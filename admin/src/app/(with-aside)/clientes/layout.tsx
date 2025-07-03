import Link from 'next/link'
import React from 'react'
import { BiPlus } from 'react-icons/bi'

export default function ProductosAdminLayout({
  children,
  modal, // ← aquí Next inyecta el contenido de @modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-5">
      <header className="flex justify-between items-center text-white">
        <h1 className="font-semibold">MIS CLIENTES</h1>
      </header>
      <section className="w-full h-full">{children}</section>

      {modal}
    </div>
  )
}
