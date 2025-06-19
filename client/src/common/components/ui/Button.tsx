'use client'

import React from 'react'
import Link from 'next/link'

type ButtonProps = {
  children?: string //Contenido escrito en el button
  variant?: 'primary' | 'secondary' //primary es bordo, secondary es blanco
  type?: 'button' | 'submit' | 'reset'
  href?: string //si se incluye convierte al boton en un <a>
  onClick?: () => void
  disabled?: boolean
  className?: string
  icon?: React.ReactNode // opcion para incluir iconos ej:icon={<FiArrowRight size={18} />}
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  type = 'button',
  href,
  onClick,
  disabled = false,
  className = '',
  icon,
  ...props
}) => {
  const baseClasses =
    'shadow-lg px-8 py-1.5 text-[20px] font-bold  rounded-[54px] my-4 hover:cursor-pointer transition-all duration-350 transition'

  let variantClasses = ''
  if (variant === 'primary') {
    variantClasses =
      'bg-[#92140C] text-white hover:bg-black hover:scale-105 transition duration-200'
  } else if (variant === 'secondary') {
    variantClasses =
      'bg-white text-[#92140C] hover:text-black hover:scale-110 transition duration-200'
  }

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''

  const allClasses = `${baseClasses} ${variantClasses} ${disabledClasses} ${className}`

  //Estructura del contenido icono + texto
  const content = (
    <div className="flex items-center justify-center gap-3">
      {icon && <span className="ease-in-out">{icon}</span>}
      {children && <span>{children}</span>}
    </div>
  )

  //Opcion de <a>
  if (href) {
    return (
      <Link
        href={href}
        {...props}
        className={`flex items-center justify-center ${allClasses}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={allClasses}
      {...props}
    >
      {content}
    </button>
  )
}

export default Button
