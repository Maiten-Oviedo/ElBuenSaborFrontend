import Aside from '@/common/components/layout/aside/Aside'
import Header from '../../common/components/layout/header/Header'

export default function LayoutAsideHeader({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    //Header fijo arriba, aside+main abajo
    <div className="flex flex-col min-h-screen bg-brown">
      <Header />

      {/* Aside izq, main der */}
      <div className="flex flex-1 overflow-hidden">
        <Aside />
        <main className="flex-1 p-4 max-h-[calc(100vh - 50px)] bg-[url(/assets/images/fondo-naranja.webp)] bg-cover bg-center rounded-tl-3xl shadow-gray-950 inset-shadow-sm/40">
          {children}
        </main>
      </div>
    </div>
  )
}
