import React, { JSX } from 'react'
import { FaCashRegister, FaClipboardList } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'
import { FaUserGroup } from 'react-icons/fa6'
import { BsDatabaseFill } from 'react-icons/bs'
import { FaUserTag } from 'react-icons/fa6'
import { FaChartLine } from 'react-icons/fa'
import { BsDatabaseFillExclamation } from 'react-icons/bs'
import { MdFastfood } from 'react-icons/md'
import { Url } from 'next/dist/shared/lib/router/router'

export type MenuItem = {
  label: string
  icon?: JSX.Element
  href?: Url
  children?: MenuItem[]
}

export const sideBarMenu: MenuItem[] = [
  // {
  //   label: 'Gestión Ventas',
  //   icon: <FaCashRegister size={20} />,
  //   href: '/nueva-venta',
  // },
  {
    label: 'Gestión Compras',
    icon: <FaShoppingCart size={20} />,
    href: '/nueva-compra',
  },
  {
    label: 'Mis Empleados',
    icon: <FaUserGroup size={20} />,
    children: [
      { label: 'Roles', href: '/empleados/roles' },
      { label: 'Administración', href: '/empleados/administracion' },
    ],
  },
  {
    label: 'Insumos',
    icon: <FaClipboardList size={20} />,
    children: [
      { label: 'Rubros', href: '/insumos/rubros' },
      { label: 'Administración', href: '/insumos/administracion' },
    ],
  },
  {
    label: 'Productos',
    icon: <BsDatabaseFill size={20} />,
    children: [
      { label: 'Rubros', href: '/productos/rubros' },
      { label: 'Administración', href: '/productos/administracion' },
      { label: 'Promociones', href: '/productos/promociones' },
    ],
  },
  { label: 'Mis Clientes', icon: <FaUserTag size={20} />, href: '/clientes' },
  {
    label: 'Estadísticas',
    icon: <FaChartLine size={20} />,
    href: '/estadisticas',
  },
  {
    label: 'Órdenes del Día',
    icon: <MdFastfood size={20} />,
    href: '/ordenes-diarias',
  },
  {
    label: 'Control de Bajo Stock',
    icon: <BsDatabaseFillExclamation size={20} />,
    href: '/control-stock',
  },
]
