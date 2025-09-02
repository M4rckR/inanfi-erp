// schemas/categoria.schema.ts
import { Estado } from '@/lib/enums/estado.enum';
import { z } from 'zod';

export const categoriaCreateSchema = z.object({
  catId: z.number().int().optional(),
  catNom: z.string().nonempty({message: 'El nombre de la categoría es requerido' }).max(50, {message: 'El nombre de la categoría debe tener mínimo 3 caracteres'}),
  catEst : z.nativeEnum(Estado).optional(),
});


export type CategoriaCreateFormData = z.infer<typeof categoriaCreateSchema>;


export const defaultCategoriaValues : z.infer<typeof categoriaCreateSchema> = {
  catId: undefined,
  catNom: '',
  catEst: undefined
}