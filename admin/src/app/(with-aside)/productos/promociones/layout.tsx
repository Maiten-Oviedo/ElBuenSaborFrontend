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
    <>
      <header className="flex justify-between items-center text-white">
        <h1 className="font-semibold">PRODUCTOS &gt; PROMOCIONES</h1>
        <Link
          href="/productos/promociones/crear"
          className="flex items-center gap-1 rounded-2xl px-3 py-1 bg-orange font-semibold hover:bg-brown hover:scale-105 transition-all"
        >
          <BiPlus className="size-8" /> <span>Nueva Promocion</span>
        </Link>
      </header>
      <section className='w-full h-full'>{children}</section>

      {modal}
    </>
  )
}
