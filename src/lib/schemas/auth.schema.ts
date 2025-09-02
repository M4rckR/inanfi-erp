import z from "zod";

export const authSchema = z.object({
  username: z.string().nonempty({ message: 'El nombre de usuario es requerido.' }),
  password: z.string().nonempty({ message: 'La contraseña es requerida.' }),
});

export const authDefaultValues: z.infer<typeof authSchema> = {
  username: '',
  password: '',
}