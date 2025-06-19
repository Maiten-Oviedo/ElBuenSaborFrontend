import { IArticuloPromocion } from "@/common/types/entities/IArticuloPromocion";
import { ITableColumn } from "@/common/types/generic table/IGenericTableProps";

export const promocionTableColumns: ITableColumn<IArticuloPromocion>[] = [
    { label: 'id', key: 'id' },
    { label: 'Nombre', key: 'denominacion' },
    { label: 'Precio Original', key: 'precioTotal' },
    { label: 'Precio Promocional', key: 'precioVenta' },
    { label: 'Descipcion Descuento', key: 'descripcion' },
    {
        label: 'Imágenes',
        key: 'imagenesUrls',
        render: row =>
            Array.isArray(row.imagenesUrls) && row.imagenesUrls.length > 0 ? (
                row.imagenesUrls.map((imagen) => (
                    <img
                        key={imagen.id}
                        src={imagen.url}
                        alt={row.denominacion}
                        className="w-20 h-16 object-cover mx-auto"
                    />
                ))
            ) : (
                'Sin imágenes'
            ),
    },
    { label: 'Válido desde', key: 'fechaDesde' },
    { label: 'Válido hasta', key: 'fechaHasta' },
    { label: 'Acciones', key: 'acciones' },
];
