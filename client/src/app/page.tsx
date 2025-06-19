import Carrousel from '@/features/Landing/Carrousel'
import Hero from '@/features/Landing/Hero'
import Mapa from '@/features/Landing/Mapa'
import SobreNosotros from '@/features/Landing/SobreNosotros'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  return (
    <main className="text-[1rem] relative min-h-screen overflow-x-hidden">
      {/* SECCIÓN 1: Fondo negro con borde inferior irregular */}
      <section
        style={{
          backgroundImage: 'url("/images/landing/fondoNegro.webp")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
        }}
        className="flex justify-center pt-[200px] h-[110vh]"
      >
        <Hero />
      </section>

      {/* SECCIÓN 2: Fondo rojo que se verá detrás del PNG irregular */}
      <section className="relative h-[1200px] -mt-[80px] w-full flex flex-col justify-start pt-[100px] items-center">
        <div
          style={{
            position: 'absolute',
            top: 0,
            backgroundImage: 'url("/images/landing/fondo-info.webp")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            zIndex: -10,
            width: '100%',
            height: '100%',
          }}
        >
        </div>
        <Carrousel />
      </section>
      <SobreNosotros />
      <section className="md:flex relative -mt-[100px] flex-col  justify-center items-center h-[100vh] z-10">
      <div
          style={{
            position: 'absolute',
            top: 0,
            backgroundImage: 'url("/images/landing/fondoNegroTop.webp")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top',
            backgroundSize: 'cover',
            zIndex: 30,
            width: '100%',
            height: '100%',
          }}
        >
        </div>
          <Mapa />
      </section>
    </main>

  )
}

export default page
