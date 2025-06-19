import Button from '@/common/components/ui/Button'
import { FaInstagram, FaWhatsapp, FaFileDownload } from 'react-icons/fa'

const FinalModal = () => {
  return (
    <div className="text-white text-2xl p-12 bg-[#000000] rounded-3xl">
      <h1 className="text-3xl font-bold">¡TU PEDIDO FUE REALIZADO!</h1>
      <h3 className="text-xl mt-2">Tu número de orden es 132</h3>
      <p className="mt-1 mb-6">Tu pedido estará listo en 35 minutos</p>

      <div className="flex justify-center w-[40vh] lg:w-full lg:justify-normal mt-2 pt-5 px-2 lg:px-0 gap-8">
        <Button icon={<FaWhatsapp />}>Escribinos!</Button>
        <Button icon={<FaInstagram />}>@elbuensabor</Button>
      </div>

      <Button variant="secondary" icon={<FaFileDownload />} className="mt-4">
        Descargar factura en PDF
      </Button>
    </div>
  )
}

export default FinalModal
