"use client"

import Button from "@/common/components/ui/Button";
import Input from "@/common/components/ui/forms/Input";
import { useAuthStore } from "@/common/store/useAuthStore";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';


const Register = () => {
  const register = useAuthStore((state) => state.register);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellido: '',
    telefono: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData); // 🚀 LLAMÁS A LA FUNCIÓN DE ZUSTAND
      router.push('/');
    } catch (error) {
      console.error('Error al registrar:', error);
    }
  };

  return (
    <div className="flex justify-between w-full h-[100vh] items-start gap-10 bg-black"
      style={{
        backgroundImage: 'url("/images/carrito-perfil/fondo-naranja.webp")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
      }}>
      <section className="w-[70%] pt-10 flex flex-col items-center justify-center gap-10">
        <header className="flex items-center justify-center ">
          <img src="/logo.png" alt="Logo" className="h-[10vh]" />
        </header>
        <form onSubmit={handleSubmit} className="w-[55%] h-[80%] flex flex-col justify-center items-center bg-[#740e07] rounded-4xl shadow-lg p-8 gap-4">
          <h1 className="oi text-4xl text-white">registrarse</h1>
          {['email','nombre','apellido','telefono','password'].map((field) => (
            <Input
              key={field}
              type={field === 'password' ? 'password' : 'text'}
              name={field}
              placeholder={field}
              value={(formData as any)[field]}
              onChange={handleChange}
            />
          ))}
          <Button type="submit">
            REGISTRARME
          </Button>
          <a href="/auth/login" className="text-white text-s flex gap-3">
            ¿Ya tienes una cuenta?{" "}
            <p className="underline">Iniciar Sesión</p>
          </a>
          <button className="flex cursor-pointer items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg transition duration-300 ease-in-out hover:bg-gray-100 active:scale-95">
            <FcGoogle className="text-2xl" />
            <span className="text-black text-sm">Ingresar con Google</span>
          </button>
        </form>
      </section>

      <video
        className="object-cover h-[10+0vh] relative w-[50%] overflow-hidden pl-6"
        src="/images\landing\video-hamburguesería.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

    </div>
  );
};

export default Register;
