import Button from '@/common/components/ui/Button'
import Image from 'next/image'
import React from 'react'

type Props = {}

const Hero = (props: Props) => {


  return (
    <div>
      <article className="h-[85%] relative flex flex-col items-center justify-between lg:justify-normal w-full lg:w-auto">
        <Image className="absolute top-38 md:left-5 md:top-44 lg:top-16 lg:left-[-200px]" src="/images/landing/burger-home.webp" alt="BBQ" width={500} height={500} />
        <h1 className="text-[15em] text-white oi shadow-text h-[400px] ml-4 mt-[-10px] md:text-[300px] md:mt-0 md:ml-52 lg:mb-10 lg:ml-10 lg:mt-[-0px] lg:text-[350px]">
          BBQ
        </h1>
        <h3
          className="text-white italic font-semibold text-left text-[1.1em] mt-8 md:mt-0 w-[400px] md:w-[350px] md:text-[1.3em] md:text-start md:translate-x-5 lg:mt-2 lg:text-lg lg:w-[400px] "
          style={{ fontFamily: 'Montserrat' }}
        >
          Triple carne, triple cheddar, mayonesa casera, pepinillos y cebolla crispy
        </h3>
        <Button href='/menu' >PEDIR AHORA</Button>
        <Image className="absolute self-end scale-[0.2] md:scale-[0.8]  md:right-20 lg:bottom-[-100] lg:scale-[0.45] lg:-right-72" src='/svg/landing/burger-guy.svg' alt="BBQ" width={500} height={500} />
      </article>
    </div>
  )
}

export default Hero