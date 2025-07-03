// app/LayoutWrapper.tsx
'use client'
import { usePathname } from 'next/navigation'
import Header from '../common/components/layout/header/Header'

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const noHeaderRoutes = ['/auth/login', '/auth/register']
  const showHeader = !noHeaderRoutes.includes(pathname)

  return (
    <>
      {showHeader && <Header />}
      <main>{children}</main>
    </>
  )
}
