import { Documento } from "@/lib/enums/documento.enum";
import { Estado } from "@/lib/enums/estado.enum";
import { z } from "zod";


export const ProveedorSchema = z.object({
    pvdId: z.number().int().optional(),
    pvdNom: z.string().nonempty({ message: 'El nombre del proveedor es requerido.' }).max(50, { message: 'El nombre del proveedor no puede exceder los 50 caracteres.' }).min(3, { message: 'El nombre del proveedor debe tener mínimo 3 caracteres' }),
    pvdRazSoc: z.string().nonempty({ message: 'La razón social del proveedor es requerida.' }).max(255, { message: 'La razón social no puede exceder los 255 caracteres.' }),
    pvdTipDoc: z.nativeEnum(Documento, { message: 'El tipo de documento es requerido.' }),
    pvdNumDoc: z.string().nonempty({ message: 'El número de documento es requerido.' }),
    pvdTel: z.string().nonempty({ message: 'El teléfono del proveedor es requerida.' }).min(9, { message: 'El teléfono debe tener 9 caracteres.' }).max(20, {message: 'El teléfono no puede exceder los 20 caracteres.'}),
    pvdEma: z.string().email({ message: 'El correo electrónico debe ser válido.' }).max(255, { message: 'El correo electrónico no puede exceder los 255 caracteres.' }),
    pvdDir: z.string().nonempty({ message: 'La dirección del proveedor es requerida.' }).max(255, { message: 'La dirección no puede exceder los 255 caracteres.' }),
    pvdEst: z.nativeEnum(Estado).optional()
})
.refine(
  (data) => {
    if (data.pvdTipDoc === Documento.RUC) {
      return data.pvdNumDoc.length === 11;
    }
    if (data.pvdTipDoc === Documento.OTRO) {
      return data.pvdNumDoc.length > 8;
    }
    return true;
  },
  (data) => {
    if (data.pvdTipDoc === Documento.RUC) {
      return {
        path: ["pvdNumDoc"],
        message: 'El número debe tener 11 caracteres.',
      };
    }
    if (data.pvdTipDoc === Documento.OTRO) {
      return {
        path: ["pvdNumDoc"],
        message: 'El número debe tener más de 8 caracteres.',
      };
    }
    return {};
  }
);

export type Proveedor = z.infer<typeof ProveedorSchema>;

export const defaultProveedoresValues: z.infer<typeof ProveedorSchema> = {
    pvdId: undefined,
    pvdNom: '',
    pvdRazSoc: '',
    pvdTipDoc: undefined!,
    pvdNumDoc: '',
    pvdTel: '',
    pvdEma: '',
    pvdDir: '',
    pvdEst:  Estado.ACTIVO,
}