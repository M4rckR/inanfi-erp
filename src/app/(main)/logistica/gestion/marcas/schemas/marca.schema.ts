import { Estado } from "@/lib/enums/estado.enum";
import { z } from "zod";


export const MarcaSchema = z.object({
    marId: z.number().int().optional(),
    marNom: z.string().nonempty({message: 'El nombre de la marca es requerido' }).max(50, {message: 'El nombre de la marca debe tener mínimo 3 caracteres'}),
    marEst: z.nativeEnum(Estado).optional()
});

export type Marca = z.infer<typeof MarcaSchema>;

export const defaultMarcaValues: z.infer<typeof MarcaSchema> = {
    marId: undefined,
    marNom: '',
    marEst: undefined
}