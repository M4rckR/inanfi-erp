import z from 'zod';

export const FilterMarcaSchema = z.object({
    marNom: z.string().optional(),
    marEst: z.string().optional(),
    sort: z.string().optional()
});

export type FilterMarca = z.infer<typeof FilterMarcaSchema>;

export const defaultFilterMarcaValues: z.infer<typeof FilterMarcaSchema> = {
    marNom: '',
    marEst: undefined,
    sort: 'marId,ASC'
}
