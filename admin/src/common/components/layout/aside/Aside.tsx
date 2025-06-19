'use client'
import { useState } from "react";
import Link from "next/link";
import { MenuItem } from "@/common/lib/constants/sideBarMenu";
import { motion, AnimatePresence } from "framer-motion";
import { sideBarMenu } from "@/common/lib/constants/sideBarMenu";

{/*Faltaría filtrar las opciones según los permisos del usuario, pero lo voy a hacer más adelante */}
export default function Aside() {
  const [openChildren, setOpenChildren] = useState<string | null>(null);

  const toggleChildren = (label: string) => {
    setOpenChildren(openChildren === label ? null : label);
  };

  const renderChildren = (item: MenuItem) =>{
    return (
      <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-brown-dark-400 rounded-lg w-full mt-3 flex flex-col overflow-hidden"
      >
        {item.children!.map((child) => (
          child.href && (
            <Link className="w-full h-9 pl-6 content-center rounded-lg hover:bg-brown-dark-600" key={child.label} href={child.href}>
              {child.label}
            </Link>
        )))}
      </motion.div>

    )
  }

  return (
    <aside className="w-4xs bg-brown flex flex-col text-sm z-10 shadow-2xl shadow-gray-950">      
      <nav className="text-white font-medium mt-4 px-3 flex flex-col gap-6 ">
        {sideBarMenu.map((item) => (
          //Contenedor de cada opción del menú
          <div key={item.label} className="w-full min-h-10 py-2 pr-2 pl-4 flex items-center hover:bg-[#5c3614] rounded-lg text-left">
            {/* Cada opción */}
            {item.children ? (
              //Si la opción tiene subopciones, llamará a renderChildren()
              <div className="w-full">
                <button className="w-full h-full flex items-center gap-3 cursor-pointer" onClick={() => toggleChildren(item.label)}>
                  {item.icon}
                  <span>{item.label}</span>
                  <motion.span
                    animate={{ rotate: openChildren === item.label ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block">
                    ▸
                  </motion.span>
                </button>
                {/*Animación en el despliegue de las subopciones*/}
                <AnimatePresence initial={false}>
                  {openChildren === item.label && (
                  renderChildren(item))}
                </AnimatePresence>
              </div>
            ) : (
              //Si la opción no tiene subopciones, la opción será directamente un Link que ridirija
              item.href && (
                <Link key={item.label} href={item.href} className="flex items-center gap-3 h-full max-w-[90%]">
                  {item.icon}
                  {item.label}
                </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  )
}