import { Estado } from "@/lib/enums/estado.enum";
import { z } from "zod";


export const ProductoSchema = z.object({
    prdId: z.number().int().optional(),
    prdNom: z.string().nonempty({message: 'El nombre del producto es requerido' }).min(3, {message: 'El nombre del producto debe tener mínimo 3 caracteres'}).max(200, {message: 'El nombre del producto no puede exceder de los 200 caracteres.'}),
    prdDes: z.string().nonempty({message: 'La descripción del producto es requerido' }).min(3, { message: 'La descripción del producto debe tener mínimo 3 caracteres' }).max(255, { message: 'La descripción debe tener un máximo de 255 caracteres.' }),
    
 
    catId: z.number().int().min(1, { message: 'Se debe seleccionar una categoría' }),
    sgiId: z.number().int().min(1, { message: 'Se debe seleccionar un segmento' }),
    uniId: z.number().int().min(1, { message: 'Se debe seleccionar el tipo de unidad' }),
    
   
    
    prdEst: z.nativeEnum(Estado).optional()
});

export type Producto = z.infer<typeof ProductoSchema>;

export const defaultProductoValues: z.infer<typeof ProductoSchema> = {
    prdId: undefined,
    prdNom: '',
    prdDes: '',
    catId: undefined!,

    sgiId: undefined!,
 
    uniId: undefined!,
 
    prdEst: undefined
}
