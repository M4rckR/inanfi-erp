import { Estado } from "@/lib/enums/estado.enum";
import { z } from "zod";


export const ProductoProveedorSchema = z.object({

    prdPvdId: z.number().int().optional(),
    prdPvdSku: z.string(),
    prdPvdPre: z.number(),
    
    pvdId: z.number().int().min(1, { message: 'Se debe seleccionar una proveedor' }).optional(),
    prdId: z.number().int().min(1, { message: 'Se debe seleccionar un producto' }),
    marId: z.number().int().min(1, { message: 'Se debe seleccionar la marca' }),
    
    prdPvdEst: z.nativeEnum(Estado).optional()
});

export type ProductoProveedor = z.infer<typeof ProductoProveedorSchema>;

export const defaultProductoProveedorValues: z.infer<typeof ProductoProveedorSchema> = {
    prdPvdId: undefined,
    prdPvdSku: undefined!,
    prdPvdPre: 0,
    
    pvdId: undefined!,
    prdId: 0!,
    marId: 0!,
 
    prdPvdEst: Estado.ACTIVO
}
