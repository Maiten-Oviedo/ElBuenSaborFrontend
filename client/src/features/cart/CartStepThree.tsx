"use client";

import { IPedido } from "@/common/types/entitites/IPedido";
import Button from "@/common/components/ui/Button";
import { FaFileDownload, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { useMemo } from "react";
import Link from "next/link";
import { BsArrowRight } from "react-icons/bs";

const calcularMensajeFinalizacion = (horaEstimadaStr: string): string => {
  const ahora = new Date();
  const [horasStr, minutosStr, segundosStr] = horaEstimadaStr.split(":");
  const horas = parseInt(horasStr);
  const minutos = parseInt(minutosStr);
  const segundos = parseInt(segundosStr);

  const final = new Date();
  final.setHours(horas, minutos, segundos, 0);

  if (final <= ahora) {
    return "¡Tu pedido ya está disponible!";
  }

  const diferenciaMs = final.getTime() - ahora.getTime();
  const diferenciaMin = Math.ceil(diferenciaMs / (1000 * 60));

  const horasRestantes = Math.floor(diferenciaMin / 60);
  const minutosRestantes = diferenciaMin % 60;

  if (horasRestantes > 0 && minutosRestantes > 0) {
    return `Estará listo en ${horasRestantes} hora${
      horasRestantes > 1 ? "s" : ""
    } y ${minutosRestantes} minuto${
      minutosRestantes > 1 ? "s" : ""
    } aproximadamente.`;
  } else if (horasRestantes > 0) {
    return `Estará listo en ${horasRestantes} hora${
      horasRestantes > 1 ? "s" : ""
    } aproximadamente.`;
  } else {
    return `Estará listo en ${minutosRestantes} minuto${
      minutosRestantes > 1 ? "s" : ""
    } aproximadamente.`;
  }
};

const CartStepThree = ({ pedido }: { pedido: IPedido }) => {
  const mensajeFinalizacion = useMemo(
    () => calcularMensajeFinalizacion(pedido.horaEstimadaFinalizacion!),
    [pedido.horaEstimadaFinalizacion]
  );

  const handlePDF = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/facturas/pedido/${pedido.id}`
      )

      const blob = await response.blob()

      // Verifica que sea PDF
      if (response.headers.get('Content-Type') !== 'application/pdf') {
        const text = await blob.text()
        console.error('Respuesta inesperada:', text)
        return
      }

      // Descargar el archivo
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `factura_pedido_${pedido.id}.pdf`
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error descargando el PDF:', error)
      alert('Hubo un problema al generar la factura.')
    }
  }

  return (
    <div className="text-white text-2xl p-12 bg-[#000000] rounded-3xl flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">¡TU PEDIDO FUE APROBADO!</h1>
      <h3 className="text-xl mt-2">
        Tu número de orden es{" "}
        <span className="text-xl text-red font-bold">N°{pedido.id}</span>
      </h3>
      <p className="mt-1 mb-6 text-xl">{mensajeFinalizacion}</p>
      <Link
        href={"/profile/ordenes"}
        className="bg-white px-8 py-1 text-center text-red font-bold text-xl rounded-full flex flex-row w-max items-center gap-3"
      >
        <span>Mis Órdenes</span> <BsArrowRight />
      </Link>

      <div className="flex justify-center w-[40vh] lg:w-full lg:justify-normal  pt-5 px-2 lg:px-0 gap-8">
        <Button icon={<FaWhatsapp />}>Escribinos!</Button>
        <Button icon={<FaInstagram />}>@elbuensabor</Button>
      </div>

      {pedido.estadoPagoEnum === 'PAGADO' && (
        <Button
          onClick={handlePDF}
          variant="secondary"
          icon={<FaFileDownload />}
          className="mt-4"
        >
          Descargar factura en PDF
        </Button>
      )}
    </div>
  );
};
export default CartStepThree;
