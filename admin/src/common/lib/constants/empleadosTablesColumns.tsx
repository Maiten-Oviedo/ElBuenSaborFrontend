// =========== COLUMNAS DE MOVIMIENTOS =========== //
export const rolesTableColumns = [
    { label: 'id', key: 'id' },
    { label: 'denominacion', key: 'denominacion' },
    { label: 'cant empleados', key: 'cantEmpleados' },
    {
        label: "Permisos",
        key: "permisos",
        Cell: ({ row }: { row: any }) => {
            const permisos: string[] = row.permisos;

            const texto = permisos
                .map(p => p.charAt(0).toUpperCase() + p.slice(1))
                .join(" - ");

            return texto;
        },
    }
]

export const empleadosTableColumns = [
    { label: 'id', key: 'id' },
    { label: 'nombre', key: 'nombre' },
    { label: 'apellido', key: 'apellido' },
    { label: 'telefono', key: 'telefono' },
    { label: 'email', key: 'email' },
    { label: 'rol', key: 'rol' },
    { label: 'acciones', key: 'acciones' },
]