'use client'

import { User } from "@/common/types/entities/user";
import Image from "next/image";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";

type Props = {
  user?: User;
};

export default function Header({user}:Props) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  //Abrir menu desplegable de User
  const renderUserMenu = () => {

  const options = [
    { label: 'Mi perfil', href: '/mi-perfil' },
    { label: 'Cerrar sesión', href: '/auth/logout', isRed: true }
  ]

  return (
      <div className="absolute top-11 bg-white text-black text-right right-10 mt-2 rounded-2xl shadow-md w-48 z-50">
        {options.map(({ label, href, isRed }) => (
          <a
          key={href}
          href={href}
          className={`block w-full px-4 py-3 ${
          isRed
          ? 'bg-[#92140C] text-white hover:bg-[#78120C] rounded-xl font-bold '
          : 'hover:bg-gray-100 hover:rounded-2xl text-black font-normal'
          }`}
          >
          {label}
          </a>
          ))}
      </div>
    );
  };

  return (
    <header className="w-[100%] h-[50px] bg-brown flex justify-end">
      <div className="min-w-[55%] h-[100%] flex justify-between">
        <div className="h-[100%] content-center">
          <Image alt="Logo de El Buen Sabor" src="/logo.webp" width={637/7} height={264/7}/>
        </div>

          <button onClick={toggleMenu} className="flex items-center mr-8 cursor-pointer">
            <p className="text-white mr-4 text-sm">{`${user?.name} ${user?.apellido}`}</p>
            <FaUser color="white" size="1.2em" />
            <IoMdArrowDropdown color="white" size="1.2em" />
          </button>

          {isMenuOpen && renderUserMenu()}
        </div>
    </header>
  )
}