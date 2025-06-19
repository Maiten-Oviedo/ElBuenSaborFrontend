'use client'

import React, { useEffect, useState } from 'react'
import Buscador from '../../ui/Buscador'
import Image from 'next/image'
import { FaUser, FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'
import { useAuthStore } from '@/common/store/useAuthStore'
import { useCartStore } from '@/common/store/useCartStore'

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cliente, setCliente, logout } = useAuthStore()
  const items = useCartStore(state => state.items)
  //Evita errores de hidratación en items.length
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  type UserMenuOption = {
    label: string
    href?: string
    isRed?: boolean
    action?: () => void
  }

  useEffect(() => {
    const storedCliente = localStorage.getItem('cliente')
    if (storedCliente) {
      setCliente(JSON.parse(storedCliente))
    }
  }, [setCliente])

  //Manejo de transparencia del header cuando no hay scroll
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY || document.documentElement.scrollTop
      setScrollPosition(position)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headerBackground =
    scrollPosition > 2
      ? 'bg-[#0C0C0C]/90 shadow-md transition-all duration-300'
      : 'bg-transparent transition-all duration-300'

  const cart = {
    items,
  }

  const toggleMenu = () => setIsMenuOpen(prev => !prev)

  const renderUserMenu = () => {
    const options: UserMenuOption[] = cliente
      ? [
          { label: 'Mi cuenta', href: '/profile/cuenta' },
          { label: 'Mis direcciones', href: '/profile/direcciones' },
          { label: 'Seguridad', href: '/profile/seguridad' },
          { label: 'Mis órdenes', href: '/profile/ordenes' },
          { label: 'Cerrar sesión', isRed: true, action: logout },
        ]
      : [
          { label: 'Iniciar Sesión', href: '/auth/login' },
          { label: 'Registrarme', href: '/auth/register', isRed: true },
        ]

    return (
      <div className="absolute top-7 bg-white mb-12 text-black text-right right-0 mt-2 rounded-xl shadow-md w-48 z-50">
        {options.map(option =>
          option.action ? (
            <button
              key={option.label}
              onClick={() => {
                setIsMenuOpen(false)
                option.action?.()
              }}
              className={`w-full text-left px-4 py-3 ${
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
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full flex justify-between items-center py-4 px-10 text-white ${headerBackground}`}
    >
      <Link href="/menu" prefetch={true} className="text-xl font-bold">
        MENÚ
      </Link>
      <Buscador />
      <Link href={'/'} prefetch={true}>
        <Image src="/logo.png" alt="Logo" width={200} height={100} />
      </Link>
      <Link href={'/cart'} prefetch={true}>
        <button className="flex items-center gap-2 cursor-pointer">
          <FaShoppingCart className="text-2xl" />
          {isMounted && cart.items.length > 0 && (
            <span className="bg-green-800 text-white text-sm rounded-full py-0.5 px-2 font-bold">
              {cart.items.length}
            </span>
          )}
        </button>
      </Link>
      <div className="relative">
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 cursor-pointer"
        >
          {cliente && <p className="text-xl">{cliente.nombre}</p>}
          <FaUser className="text-2xl" />
        </button>
        {isMenuOpen && renderUserMenu()}
      </div>
    </header>
  )
}

export default Header
