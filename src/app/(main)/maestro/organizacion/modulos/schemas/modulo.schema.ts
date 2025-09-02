import z from 'zod';
import { Estado } from '@/lib/enums/estado.enum';

export const ModuloSchema = z.object({
  modId: z.number().int().optional(),
  modNom: z.string().nonempty({ message: 'El nombre del módulo es requerido.' }).max(50, { message: 'El nombre del módulo no puede exceder los 50 caracteres.' }),
  modEst: z.nativeEnum(Estado).optional(),
});

export type Modulo = z.infer<typeof ModuloSchema>;

export const defaultModuloValues: z.infer<typeof ModuloSchema> = {
  modId: undefined,
  modNom: '',
  modEst: undefined,
};