import z from 'zod';

export const FilterProductoProveedorSchema = z.object({
    prdPvdSku: z.string().optional(),
    pvdId: z.number().optional(),
    marNom: z.string().optional(),
    prdPvdEst: z.string().optional(),
    sort: z.string().optional()
});

export type FilterProductoProveedor = z.infer<typeof FilterProductoProveedorSchema>;

export const defaultFilterProductoProveedorValues: z.infer<typeof FilterProductoProveedorSchema> = {
    pvdId: 0,
    prdPvdSku: '',
    marNom: '',
    prdPvdEst: undefined,
    sort: 'pvdId,ASC'
}
