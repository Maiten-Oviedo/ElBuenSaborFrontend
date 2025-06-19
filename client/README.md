# 🍔 ElBuenSabor - Cliente Frontend

Este repositorio contiene el código fuente del **frontend cliente** de **ElBuenSabor**, una aplicación web de pedidos para una hamburguesería. Esta interfaz está pensada para los **usuarios finales (clientes)** y fue desarrollada en **Next.js con TypeScript**, aplicando patrones modernos de diseño y estado global.

---

## 👥 Integrantes del equipo

- [@JuanCruzRobledo](https://www.github.com/JuanCruzRobledo)
- [@Maiten-Oviedo](https://www.github.com/Maiten-Oviedo)
- [@isabellaromo](https://www.github.com/isabellaromo)
- [@ambargorgon](https://www.github.com/ambargorgon)

---

## 📦 Tecnologías utilizadas

- **Next.js**
- **React**
- **TypeScript**
- **Zustand** (manejo de estado global)
- **Formik** + **Yup** (formularios y validación)
- **Axios** (peticiones HTTP)
- **Tailwind CSS** (estilos)
- **React Router DOM** (navegación interna)
- **Cloudinary** (para gestión de imágenes)
- **MercadoPago SDK** (integración de pagos)

---

## 📁 Estructura del proyecto

El proyecto se organiza de forma modular, separando las responsabilidades en carpetas:

- `components/`: Componentes reutilizables de la interfaz
- `pages/`: Rutas y vistas principales
- `store/`: Manejo del estado global (Zustand)
- `services/`: Comunicación con el backend
- `utils/`: Utilidades generales (helpers, validaciones, etc.)
- `assets/`: Imágenes y recursos estáticos

---

## ⚙️ Instrucciones de instalación y ejecución

### 1. Instalar dependencias

```bash
npm install
```

> ⚠️ Algunas funcionalidades como pagos o imágenes requieren configuración previa en MercadoPago y Cloudinary.

### 2. Ejecutar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

---

## 🧩 Módulos implementados

### 🛒 Módulo de Pedidos y Carrito

- Visualización del menú (hamburguesas, combos, bebidas, etc.)
- Selección y personalización de productos
- Proceso de compra paso a paso
- Integración con MercadoPago (modal de pago)
- Confirmación visual del estado del pedido

### 👤 Módulo de Usuario

- Registro y login con Google o email/contraseña
- Visualización de perfil
- Visualización de historial de pedidos
- Gestión de direcciones

### 📦 Módulo de Productos

- Visualización dinámica de productos desde la API
- Imágenes cargadas con Cloudinary
- Filtros por categorías
- Descuentos y promociones activas

### 💬 Módulo de Notificaciones

- WebSocket para recibir actualizaciones de estado del pedido en tiempo real

---

## 🚧 Funcionalidades pendientes

### 🔐 Seguridad y perfil

- Página "Mi Perfil – Seguridad" para modificar correo o contraseña (cuando no se usa Google)
- Proceso de recuperación de contraseña (a través de email)

### 📱 Responsividad y UX

- Mejora de formularios (estilo, feedback, validaciones)
- Adaptación **responsive completa** para dispositivos móviles y tablets

---

## 📌 Notas adicionales

- Este frontend está pensado para funcionar con el backend disponible en: [`elbuensabor-back`](https://github.com/usuario/elbuensabor-back)
- Asegurarse de levantar el backend con el perfil adecuado (`test` o `dev`) según la configuración del entorno

---

## 📅 Última actualización README

📆 2025-06-19

---
