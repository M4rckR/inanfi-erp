import { Estado } from "@/lib/enums/estado.enum";
import { z } from "zod";


export const UnidadesSchema = z.object({
    uniId: z.number().int().optional(),
    uniNom: z.string().optional(),
    uniDet: z.string().optional(),
    uniEst: z.nativeEnum(Estado).optional()
});

export type Unidades = z.infer<typeof UnidadesSchema>;

export const defaultUnidadesValues: z.infer<typeof UnidadesSchema> = {
    uniId: undefined,
    uniNom: ''
}