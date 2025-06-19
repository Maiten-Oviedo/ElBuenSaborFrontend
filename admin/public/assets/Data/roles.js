export const Roles = [
  {
    id: 4,
    denominacion: "COCINERO",
    cantEmpleados: 1,
    permisos: [
      "Órdenes Diarias - Preparacion",
      "Control Stock",
      "Mi Perfil",
      "Nueva Compra",
      "Insumos - Rubros",
      "Insumos - Administración",
      "Productos - Rubros",
      "Productos - Administración",
    ],
  },
  {
    id: 3,
    denominacion: "CAJERO",
    cantEmpleados: 1,
    permisos: [
      "Órdenes Diarias - Pendientes",
      "Órdenes Diarias - Terminado",
      "Órdenes Diarias - Delivery",
      "Órdenes Diarias - Entregado",
      'Mi Perfil',
    ],
  },
  {
    id: 5,
    denominacion: "DELIVERY",
    cantEmpleados: 1,
    permisos: [
      "Órdenes Diarias - Delivery"],
  },
];
