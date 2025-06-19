import Link from 'next/link'
import React from 'react'
import { BiPlus } from 'react-icons/bi'

export default function RolesLayout({
  children,
  modal, // ← aquí Next inyecta el contenido de @modal
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <>
      <header className="flex justify-between items-center text-white mb-6">
        <h1 className="font-semibold">MIS ROLES </h1>
      </header>
      <main>{children}</main>

      {modal}
    </>
  )
}
