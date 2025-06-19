import Button from '@/common/components/ui/Button'
import Image from 'next/image';
import React from 'react'
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
type Props = {}

const SobreNosotros = (props: Props) => {
    return (
        <section id="nosotros" className="h-[80vh] sm:h-[70vh] relative w-full overflow-hidden -mt-[80px] flex justify-center items-center z-0">
            <div className="absolute -z-30 w-full h-full overflow-hidden">
                <video
                    className="w-full h-full object-cover"
                    src="/images\landing\video-hamburguesería.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10"></div>
            </div>
            <div
                id="nosotros"
                className="flex flex-col sm:flex-row sm:justify-evenly items-center  w-full"
            >
                <div className="text-2xl lg:text-3xlflex flex-col justify-center items-start text-white leading">
                    SOBRE <br />
                    <span className="text-8xl leading-05 mt-3 lg:mt-0 oi shadow-text ">
                        nosotros
                    </span>
                    <br />
                    <span className="text-[#E34234] text-2xl lg:text-3xl drop-shadow-lg italic font-extrabold text-right self-end">
                        DESDE 2015
                    </span>
                </div>
                <div className="max-w-[40vh] md:max-w-[55vh] lg:max-w-[550px] flex flex-col gap-8 text-white font-semibold text-[1.2em]  text-center md:text-left">

                    <div className='flex items-start justify-center'>
                        <p className="font-[Montserrat] font-semibold text-[1.2em] md:text-[1.1em] lg:text-[20px] text-center md:text-left leading-relaxed">
                            En{' '}
                            <span className="inline-flex items-center px-1 pb-2 align-bottom ">
                                <Image
                                    src="/logo.png"
                                    width={100}
                                    height={100}
                                    alt="logo"
                                    className="object-contain"
                                />
                            </span>
                            , hacemos hamburguesas bien caseras, con ingredientes frescos y de calidad.
                            <br />
                            <br />
                            Nuestro local es un lugar perfecto para caer con amigos o en familia y disfrutar de sabores que no fallan. ¡Pasate y probá lo mejor en hamburguesas!
                        </p>
                    </div>
                    <div className="flex justify-center w-[40vh] lg:w-full lg:justify-normal mt-2 pt-5 px-2 lg:px-0 gap-8">
                        <Button
                            icon={<FaWhatsapp />}
                        >Escribinos!</Button>
                        <Button
                            icon={<FaInstagram />}
                        >@elbuensabor</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SobreNosotros