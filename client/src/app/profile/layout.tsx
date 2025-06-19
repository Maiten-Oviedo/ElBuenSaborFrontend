'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/common/store/useAuthStore'

const menuItems = [
  { label: 'Mi cuenta', path: '/profile/cuenta' },
  { label: 'Mis direcciones', path: '/profile/direcciones' },
  { label: 'Seguridad', path: '/profile/seguridad' },
  { label: 'Mis ordenes', path: '/profile/ordenes' },
  { label: 'Cerrar sesión', path: '/' }, // O implementás logout con un handler
]

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const cliente = useAuthStore(state => state.cliente)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    if (!cliente) {
      router.push('/')
    } else {
      setCheckingAuth(false)
    }
  }, [cliente, router])

  if (!cliente || checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Cargando tu cuenta...
      </div>
    )
  }

  return (
    <div
      className="flex min-h-screen"
      style={{
        backgroundImage: 'url("/images/carrito-perfil/fondo-naranja.webp")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
      }}
    >
      <main className="flex-1 p-14 mt-[100px]">{children}</main>
      <aside className="w-64 p-6 pt-[19%] bg-black/80 text-white space-y-4">
        {menuItems.map(({ label, path }) => (
          <Link
            key={path}
            href={path}
            className={`block px-3 py-2 rounded-md hover:bg-white/50 hover:text-black transition ${
              pathname === path ? 'bg-white text-black font-semibold' : ''
            }`}
          >
            {label}
          </Link>
        ))}
      </aside>
    </div>
  )
}
