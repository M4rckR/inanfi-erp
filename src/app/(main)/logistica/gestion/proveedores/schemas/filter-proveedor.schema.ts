import z from 'zod';

export const FilterProveedorSchema = z.object({
    pvdRazSoc: z.string().optional(),
    pvdNumDoc: z.string().optional(),
    pvdEst: z.string().optional(),
    sort: z.string().optional()
});

export type FilterProveedor = z.infer<typeof FilterProveedorSchema>;

export const defaultFilterProveedorValues: z.infer<typeof FilterProveedorSchema> = {
    pvdRazSoc: '',
    pvdNumDoc: '',
    pvdEst: undefined,
    sort: 'pvdId,ASC'
}
