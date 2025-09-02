import z from 'zod';

export const FilterCategoriaSchema = z.object({
  catNom: z.string().optional(),
  catEst: z.string().optional(),
  sort: z.string().optional(),
});

export type FilterCategoria = z.infer<typeof FilterCategoriaSchema>;

export const defaultFilterCategoriaValues: z.infer<typeof FilterCategoriaSchema> = {
  catNom: '',
  catEst: undefined,
  sort: 'catId,ASC',
};