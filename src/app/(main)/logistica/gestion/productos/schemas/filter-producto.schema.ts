import z from 'zod';

export const FilterProductoSchema = z.object({
  prdNom: z.string().optional(),
  catNom: z.string().optional(),
  sgiNom: z.string().optional(),
  uniNom: z.string().optional(),
  prdEst: z.string().optional(),
  sort: z.string().optional(),
});

export type FilterProducto = z.infer<typeof FilterProductoSchema>;

export const defaultFilterProductoValues: z.infer<typeof FilterProductoSchema> = {
  prdNom: '',
  catNom: '',
  sgiNom: '',
  uniNom: '',
  prdEst: undefined,
  sort: 'prdId,ASC',
};