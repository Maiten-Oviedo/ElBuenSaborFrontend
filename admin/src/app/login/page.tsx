"use client"

import Button from "@/common/components/button/Button";
// import { useAuthStore } from "@/common/store/useAuthStore";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/navigation';
import Link from "next/link";

const LoginForm = () => {
//   const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await login(formData);
//       router.push('/');
//     } catch (error) {
//       console.error('Error al registrar:', error);
//     }
//   };

  return (
    <div className="flex justify-center w-full h-[100vh] items-center gap-10 bg-black"
      style={{
        backgroundImage: 'url("/assets/images/loginFondo.webp")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'bottom',
        backgroundSize: 'cover',
      }}> 
      <div className="w-[70%] h-[100vh]"> 
        {/* parece un div inutil pero no lo borren */}
      </div>
      <section className="w-[60%] flex flex-col items-center justify-center gap-10">
        <Link href={'/insumos/administracion'}><button>Saltear el login</button></Link>
        <form className="w-[55%] h-[80%] flex flex-col justify-center items-center bg-white rounded-4xl shadow-lg p-8 gap-4">
          <h1 className="oi text-4xl text-black font-bold">Iniciar Sesión</h1>
          <div className="flex flex-col gap-7 w-[90%] pt-5">
            <input
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border-b-1 border-gray-800 h-8 text-md rounded-sm text-black"
            />
            <input
              name="password"
              placeholder="Contraseña"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="border-b-1 border-gray-800 h-8 text-md rounded-sm text-black"
            />
          </div>
          <Button type="submit">
            INGRESAR
          </Button>
          <a href="/" className="text-blue-800 text-sm">
            ¿Has olvidado tu contraseña?
          </a>
        </form>
      </section>
    </div>
  );
};

export default LoginForm;
