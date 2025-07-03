import React, { JSX } from 'react'

import {
  FaClipboardList,
  FaShoppingCart,
  FaUserTag,
  FaChartLine,
} from 'react-icons/fa'
import {
  BsDatabaseFill,
  BsDatabaseFillExclamation,
  BsInboxesFill,
} from 'react-icons/bs'

import { MdFastfood } from 'react-icons/md'
import { Url } from 'next/dist/shared/lib/router/router'
import { FaUserGroup } from 'react-icons/fa6'
import { RolEnum } from '@/common/types/entities/RolEnum'

export type MenuItem = {
  label: string
  icon?: JSX.Element
  href?: Url
  children?: MenuItem[]
  allowedRoles?: RolEnum[] // 👈 agregado
}

export const sideBarMenu: MenuItem[] = [
  {
    label: 'Gestión Compras',
    icon: <FaShoppingCart size={20} />,
    href: '/nueva-compra',
    allowedRoles: ['COCINERO', 'ADMIN'],
  },
  {
    label: 'Órdenes del Día',
    icon: <MdFastfood size={20} />,
    href: '/ordenes-diarias',
    allowedRoles: ['COCINERO', 'CAJERO', 'DELIVERY', 'ADMIN'],
  },
  {
    label: 'Mis Empleados',
    icon: <FaUserGroup size={20} />,
    allowedRoles: ['ADMIN'],
    children: [
      {
        label: 'Roles',
        href: '/empleados/roles',
        allowedRoles: ['ADMIN'],
      },
      {
        label: 'Administración',
        href: '/empleados/administracion',
        allowedRoles: ['ADMIN'],
      },
    ],
  },
  {
    label: 'Mis Clientes',
    icon: <FaUserTag size={20} />,
    href: '/clientes',
    allowedRoles: ['ADMIN'],
  },
  {
    label: 'Insumos',
    icon: <FaClipboardList size={20} />,
    allowedRoles: ['ADMIN'],
    children: [
      {
        label: 'Rubros',
        href: '/insumos/rubros',
        allowedRoles: ['ADMIN'],
      },
      {
        label: 'Administración',
        href: '/insumos/administracion',
        allowedRoles: ['ADMIN'],
      },
    ],
  },
  {
    label: 'Productos',
    icon: <BsDatabaseFill size={20} />,
    allowedRoles: ['ADMIN'],
    children: [
      {
        label: 'Rubros',
        href: '/productos/rubros',
        allowedRoles: ['ADMIN'],
      },
      {
        label: 'Admin. Manufacturadossss',
        href: '/productos/administracion',
        allowedRoles: ['ADMIN'],
      },
      {
        label: 'Admin. Promociones',
        href: '/productos/promociones',
        allowedRoles: ['ADMIN', 'CAJERO'],
      },
    ],
  },
  {
    label: 'Historial de Órdenes',
    icon: <BsInboxesFill size={20} />,
    href: '/historial-ordenes',
    allowedRoles: ['ADMIN', 'CAJERO'],
  },
  {
    label: 'Control de Bajo Stock',
    icon: <BsDatabaseFillExclamation size={20} />,
    href: '/control-stock',
    allowedRoles: ['COCINERO', 'ADMIN'],
  },
  {
    label: 'Estadísticas',
    icon: <FaChartLine size={20} />,
    href: '/estadisticas',
    allowedRoles: ['ADMIN'],
  },
]
