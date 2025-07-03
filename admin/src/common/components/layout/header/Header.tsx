'use client'

import { useAuthStore } from '@/store/useAuthStore'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { GiRiceCooker } from 'react-icons/gi'
import { IoMdArrowDropdown } from 'react-icons/io'
import { MdAdminPanelSettings, MdDeliveryDining } from 'react-icons/md'
import { PiCashRegisterFill } from 'react-icons/pi'

type UserMenuOption = {
  label: string
  href?: string
  isRed?: boolean
  action?: () => void
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const user = useAuthStore(state => state.empleado)
  const logout = useAuthStore(state => state.logout)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev)
  }

  const options: UserMenuOption[] = [
    { label: 'Mi cuenta', href: '/profile' },
    { label: 'Cerrar sesión', isRed: true, action: handleLogout },
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const renderUserMenu = () => (
    <div className="absolute top-7 bg-white mb-12 text-black text-right right-0 mt-5 mr-10 rounded-xl shadow-md w-48 z-50">
      {options.map(option =>
        option.action ? (
          <button
            key={option.label}
            onClick={() => {
              setIsMenuOpen(false)
              option.action?.()
            }}
            className={`w-full px-4 py-3 text-right cursor-pointer ${
              option.isRed
                ? 'bg-[#92140C] text-white hover:bg-[#78120C] rounded-xl font-bold'
                : 'hover:bg-gray-100 hover:rounded-2xl text-black font-normal'
            }`}
          >
            {option.label}
          </button>
        ) : (
          <Link
            key={option.href}
            href={option.href!}
            onClick={() => setIsMenuOpen(false)}
            className={`block px-4 py-3 ${
              option.isRed
                ? 'bg-[#92140C] text-white hover:bg-[#78120C] rounded-xl font-bold'
                : 'hover:bg-gray-100 hover:rounded-2xl text-black font-normal'
            }`}
          >
            {option.label}
          </Link>
        )
      )}
    </div>
  )

  if (!isMounted) return null // 👈 prevenir render hasta que esté montado

  return (
    <header className="w-full h-[50px] bg-brown flex justify-end text-base">
      <div className="w-[98%] h-full flex justify-between">
        {/* Mostrar el rol con ícono */}
        {user ? (
          <div className="flex items-center">
            {user?.rol === 'COCINERO' && (
              <p
                className="flex flex-row gap-2 items-end pl-4"
                title="Rol Cocinero"
              >
                <span>COCINERO</span>
                <GiRiceCooker className="size-6" />
              </p>
            )}
            {user?.rol === 'ADMIN' && (
              <p
                className="flex flex-row gap-2 items-end pl-4"
                title="Rol Administrador"
              >
                <span>ADMIN</span>
                <MdAdminPanelSettings className="size-6" />
              </p>
            )}
            {user?.rol === 'DELIVERY' && (
              <p
                className="flex flex-row gap-2 items-end pl-4"
                title="Rol Delivery"
              >
                <span>DELIVERY</span>
                <MdDeliveryDining className="size-6" />
              </p>
            )}
            {user?.rol === 'CAJERO' && (
              <p
                className="flex flex-row gap-2 items-end pl-4"
                title="Rol Cajero"
              >
                <span>CAJERO</span>
                <PiCashRegisterFill className="size-6" />
              </p>
            )}
          </div>
        ) : (
          <p>Cargando rol...</p>
        )}

        <div className="h-full content-center">
          <Image
            alt="Logo de El Buen Sabor"
            src="/logo.webp"
            width={637 / 7}
            height={264 / 7}
          />
        </div>

        <button
          onClick={toggleMenu}
          className="flex items-center mr-8 cursor-pointer"
        >
          <p className="text-white mr-4 text-sm">
            {user ? `${user.nombre} ${user.apellido}` : ''}
          </p>
          <FaUser color="white" size="1.2em" />
          <IoMdArrowDropdown color="white" size="1.2em" />
        </button>

        {isMenuOpen && user && renderUserMenu()}
      </div>
    </header>
  )
}
