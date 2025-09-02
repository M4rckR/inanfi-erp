import z from 'zod';
import { Estado } from '@/lib/enums/estado.enum';

export const PuestoSchema = z.object({
  pstId: z.number().int().optional(),
  pstNom: z.string().nonempty({ message: 'El nombre del puesto es requerido.' }).max(100, { message: 'El nombre del puesto no puede exceder los 100 caracteres.' }),
  pstEst: z.nativeEnum(Estado).optional()
});

export type Puesto = z.infer<typeof PuestoSchema>;

export const defaultPuestoValues: z.infer<typeof PuestoSchema> = {
  pstId: undefined,
  pstNom: '',
  pstEst: undefined,
};