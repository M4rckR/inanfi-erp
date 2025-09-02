'use client';

import z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { InputForm } from '@/app/ui/common/input-form';
import { useAuth } from '@/lib/stores/auth.store';
import { authDefaultValues, authSchema } from '@/lib/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const { login } = useAuth();
  const form = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: authDefaultValues
  });

  async function onSubmit(values: z.infer<typeof authSchema>) {
    await login(values);
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="overflow-hidden py-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form className="p-6 md:p-8" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-3xl font-bold">Bienvenido</h1>
                  <p className="text-balance text-muted-foreground">
                    Inicia sesión en tu cuenta InSalud
                  </p>
                </div>
                <div className="grid gap-2">
                  <InputForm
                    type="text"
                    name="username"
                    label="Usuario"
                    placeholder="Ingrese su nombre de usuario"
                    form={form}
                  />
                </div>
                <div className="grid gap-2">
                  <InputForm
                    type="password"
                    name="password"
                    label="Contraseña"
                    placeholder="Ingrese su nombre de contraseña"
                    form={form}
                  />
                </div>
                <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
                <Button type="submit" className="w-full">
                  Iniciar Sesión
                </Button>
              </div>
            </form>
          </Form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/gallery.png"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover object-center dark:brightness-[0.2] dark:grayscale"
              width={360}
              height={199}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
