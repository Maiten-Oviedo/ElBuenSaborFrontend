# 🍔 ElBuenSabor - Frontend

Este repositorio contiene el **frontend completo** del sistema **ElBuenSabor**, una plataforma web de pedidos y gestión para una hamburguesería. Está dividido en dos aplicaciones independientes:

- 🧑‍💻 `cliente/` – Aplicación para el **usuario final** (clientes)
- 🛠️ `admin/` – Aplicación para el **personal interno** (administradores, empleados, cocineros, repartidores)

Ambas aplicaciones se comunican con un backend común desarrollado en Java + Spring Boot.

---

## 👥 Integrantes del equipo

- [@JuanCruzRobledo](https://www.github.com/JuanCruzRobledo)
- [@Maiten-Oviedo](https://www.github.com/Maiten-Oviedo)
- [@isabellaromo](https://www.github.com/isabellaromo)
- [@ambargorgon](https://www.github.com/ambargorgon)

---

## 📦 Tecnologías principales utilizadas

### Cliente (`cliente/`)

- Next.js
- TypeScript
- Zustand
- Formik + Yup
- Tailwind CSS
- Axios
- MercadoPago SDK
- Cloudinary

### Admin (`admin/`)

- React + Vite
- TypeScript
- Zustand
- React Router DOM
- Formik / React Hook Form + Yup
- Tailwind CSS
- Axios
- WebSockets
- Cloudinary

---

## ⚙️ Instalación y ejecución

### 🔹 1. Clonar el repositorio

```bash
git clone https://github.com/Maiten-Oviedo/ElBuenSaborFrontend.git
cd ElBuenSaborFrontend
```

### 🔹 2. Ejecutar Frontend Cliente

```bash
cd cliente
```

- Seguí las instrucciones del archivo client/README.md para instalar dependencias y levantar el servidor.

### 🔹 3. Ejecutar Frontend Admin (en otra terminal)

```bash
cd admin
```

- Seguí las instrucciones del archivo admin/README.md para instalar dependencias y levantar el panel de administración.

---

## 🗂️ Estructura del repositorio

```
elbuensabor-frontend/
│
├── cliente/         → Frontend para el cliente final
│   ├── components/
│   ├── pages/
│   ├── store/
│   └── ...
│
├── admin/           → Frontend para administradores y empleados
│   ├── components/
│   ├── pages/
│   ├── routes/
│   └── ...
│
└── README.md        → Este archivo
```

---

## 📌 Requisitos

- Node.js 18 o superior
- Backend en funcionamiento en: [http://localhost:8080](http://localhost:8080)
- Variables de entorno configuradas (ver archivos `.env.example` en cada subcarpeta)

---

## 📅 Última actualización

📆 2025-06-19
