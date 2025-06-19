import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'

const PagoRechazado = () => {
  return (
    <article
      className="flex h-screen p-12 pt-28 text-white items-center justify-center"
      style={{
        backgroundImage: 'url("/images/carrito-perfil/fondo-naranja.webp")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
      }}
    >
      <div className="text-white text-2xl p-12 bg-[#000000] rounded-3xl h-[40%] flex flex-col justify-around">
        <h1 className="text-3xl font-bold text-red">
          ¡TU PEDIDO FUE RECHAZADO!
        </h1>
        <h3 className="text-2xl mt-2">Por favor, vuelve a intentarlo.</h3>
        <Link
          href={'/cart'}
          className="bg-white px-8 py-1 text-center text-red font-bold text-xl rounded-full flex flex-row w-max items-center gap-3"
        >
          <span>Carrito</span> <BsArrowRight />
        </Link>
      </div>
    </article>
  )
}

export default PagoRechazado
