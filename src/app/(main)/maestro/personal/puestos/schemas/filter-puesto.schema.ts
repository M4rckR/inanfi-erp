import z from 'zod';

export const FilterPuestoSchema = z.object({
  pstNom: z.string().optional(),
  pstEst: z.string().optional(),
  sort: z.string().optional(),
});

export type FilterPuesto = z.infer<typeof FilterPuestoSchema>;

export const defaultFilterPuestoValues: z.infer<typeof FilterPuestoSchema> = {
  pstNom: '',
  pstEst: undefined,
  sort: 'pstId,ASC',
};