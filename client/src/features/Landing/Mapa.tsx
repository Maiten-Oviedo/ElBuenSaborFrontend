import Image from 'next/image'
import React from 'react'

type Props = {}

const Mapa = (props: Props) => {
    return (
        <div className="relative z-[40] flex flex-col w-[100%] items-center gap-30">
            <Image src="/images/landing/dibujo.webp" width={1200} height={800} alt='pasos' />
            <div className='flex justify-around items-center w-[80%] self-center'>
                <iframe className="rounded-2xl border-0 outline-none shadow-none"
                    id="inlineFrameExample"
                    title="Inline Frame Example"
                    width="600"
                    height="420"
                    seamless
                    src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d6699.303181744727!2d-68.83780040028!3d-32.90737884599488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e3!4m0!4m3!3m2!1d-32.90937846468624!2d-68.84434498989931!5e0!3m2!1ses!2sar!4v1746661991847!5m2!1ses!2sar">
                </iframe>
                <div className='text-white font-extrabold shadow-2xl flex flex-col justify-center items-center text-5xl leading-20'>
                    CONOCÉ LAS MEJORES
                    <h1
                        className="oi text-center text-[100px] font-normal"
                        style={{
                            color: '#AB0A00',
                            WebkitTextStrokeWidth: '3px',
                            WebkitTextStrokeColor: '#FFF',
                        }}
                    >
                        burgers
                    </h1>
                    DE MENDOZA
                    <div className=' border-2  border-white rounded-3xl text-lg flex flex-col items-center gap-2 px-10 py-5 mt-5'>
                        <p className='underline italic font-light'>Av. San Martin 1200, Godoy Cruz</p>
                        <h2>Lunes a Viernes de 20hs a 1hs</h2>
                        <h2>Sabados y Domingos de 11hs a 15hs</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mapa