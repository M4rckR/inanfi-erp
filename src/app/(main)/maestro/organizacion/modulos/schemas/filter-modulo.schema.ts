import z from 'zod';

export const FilterModuloSchema = z.object({
  modNom: z.string().optional(),
  modEst: z.string().optional(),
  sort: z.string().optional(),
});

export type FilterModulo = z.infer<typeof FilterModuloSchema>;

export const defaultFilterModuloValues: z.infer<typeof FilterModuloSchema> = {
  modNom: '',
  modEst: undefined,
  sort: 'modId,ASC',
};