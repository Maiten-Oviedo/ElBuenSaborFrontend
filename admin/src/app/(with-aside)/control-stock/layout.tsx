import Link from 'next/link'
import React from 'react'
import { BiPlus } from 'react-icons/bi'

export default function ControlStockLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="flex justify-start items-center text-white">
        <h1 className="font-semibold">CONTROL DE BAJO STOCK</h1>
      </header>
      <section className="w-full h-full mt-5">{children}</section>
    </>
  )
}
