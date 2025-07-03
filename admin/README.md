# 🛠️ ElBuenSabor - Frontend Administrativo

Este repositorio contiene el código fuente del **frontend administrativo** de **ElBuenSabor**, una aplicación web de gestión para una hamburguesería. Esta interfaz está diseñada para el **uso interno del personal** (administradores, empleados, cocineros y repartidores), permitiendo la administración de productos, insumos, promociones, pedidos y usuarios.

---

## 👥 Integrantes del equipo

- [@JuanCruzRobledo](https://www.github.com/JuanCruzRobledo)
- [@Maiten-Oviedo](https://www.github.com/Maiten-Oviedo)
- [@isabellaromo](https://www.github.com/isabellaromo)
- [@ambargorgon](https://www.github.com/ambargorgon)

---

## 📦 Tecnologías utilizadas

- **React**
- **Vite**
- **TypeScript**
- **Zustand** (manejo de estado global)
- **Formik** + **Yup** (formularios y validación)
- **Axios** (comunicación con backend)
- **React Router DOM** (navegación)
- **Tailwind CSS** (estilos)
- **Cloudinary** (para imágenes)
- **WebSockets** (actualización en tiempo real)
- **React Hook Form** (en algunos formularios)
- **MercadoPago SDK** (testing de pagos desde cocina)

---

## 📁 Estructura del proyecto

El proyecto está organizado de forma clara y escalable, separando responsabilidades por carpetas:

- `components/`: Componentes reutilizables
- `pages/`: Páginas por vista y rol
- `routes/`: Definición de rutas con control de acceso por rol
- `store/`: Estado global con Zustand
- `services/`: Conexión con la API (Axios)
- `utils/`: Funciones de ayuda, validaciones, constantes

---

## ⚙️ Instrucciones de instalación y ejecución

### 1. Instalar dependencias

```bash
npm install
```

> ⚠️ Algunas funcionalidades requieren credenciales de Cloudinary y MercadoPago.

### 2. Ejecutar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

---

## 🧩 Módulos implementados

### 👨‍🍳 Módulo de Cocina

- Vista de pedidos entrantes
- Cambio de estados (en preparación, listo para entregar)
- Notificaciones en tiempo real vía WebSocket

### 📦 Módulo de Productos e Insumos

- CRUD de productos manufacturados
- CRUD de insumos
- Vista general del stock
- Asociación de imágenes vía Cloudinary

### 🎁 Módulo de Promociones

- Alta de promociones (POST)
- Visualización de promociones activas

### 🚚 Módulo de Entregas (Repartidores)

- Vista "Ordenes del día > Entrega por delivery"
- Asignación de pedidos
- Seguimiento de entregas

### 👥 Módulo de Usuarios

- Login de empleados con control de roles
- Asociación de vistas por rol (admin, cocinero, repartidor)
- Visualización parcial de clientes

---

## 🚧 Funcionalidades pendientes

### 🔧 Administración

- CRUD completo de Insumos > Categorías
- CRUD completo de Promociones > Categorías
- CRUD de Clientes
- CRUD completo de Empleados
- Filtros por rol y permisos en dashboard

### ⚠️ Alertas

- Control de bajo stock (alertas visuales)

### 📱 Responsividad

- Diseño responsive completo para vista de delivery y dashboard

---

## 📌 Notas adicionales

- Este frontend está diseñado para funcionar junto al backend disponible en: [`elbuensabor-back`](https://github.com/usuario/elbuensabor-back)
- Requiere levantar el backend con permisos de CORS habilitados para permitir conexión desde `localhost:3000`

---

## 📅 Última actualización README

📆 2025-06-19

---
