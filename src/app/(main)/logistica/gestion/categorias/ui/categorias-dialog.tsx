'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { InputForm } from '@/app/ui/common/input-form';
import { DialogClose } from '@radix-ui/react-dialog';
import { CategoriaCreateFormData, categoriaCreateSchema } from '../schemas/categoria.schema';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoria: CategoriaCreateFormData;
  action: (data: CategoriaCreateFormData) => void;
}

export default function CategoriasDialog({ open, onOpenChange, categoria, action }: Props) {
  const form = useForm<CategoriaCreateFormData>({
    resolver: zodResolver(categoriaCreateSchema),
    values: categoria
  });

  useEffect(() => {
    if (open) {
      form.reset(categoria);
    }
  }, [open, categoria]);

  function onSubmit(data: CategoriaCreateFormData) {
    action(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} aria-describedby={undefined}>
        <DialogHeader className="pb-4">
          <DialogTitle>
            {categoria.catId ? 'Editar Categoria' : 'Agregar Categoria'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 w-full items-center gap-3">
              <InputForm
                form={form}
                name="catNom"
                label="Categoría"
                placeholder="Ingrese el nombre del puesto"
              />
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button variant={'danger'}>
                  Cerrar
                </Button>
              </DialogClose>
              <Button
                variant={'success'}
                type="submit"
              >
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}