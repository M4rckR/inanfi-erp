import { Estado } from "@/lib/enums/estado.enum";
import { z } from "zod";


export const SegmentoSchema = z.object({
    sgiId: z.number().int().optional(),
    sgiNom: z.string().optional(),
    sgiDet: z.string().optional(),
    sgiEst: z.nativeEnum(Estado).optional()
});

export type Segmentos = z.infer<typeof SegmentoSchema>;

export const defaultSegmentoValues: z.infer<typeof SegmentoSchema> = {
    sgiId: undefined,
    sgiNom: ''
}