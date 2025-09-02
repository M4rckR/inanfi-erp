import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { InputForm } from '@/app/ui/common/input-form';
import { DialogClose } from '@radix-ui/react-dialog';
import { Marca, MarcaSchema } from '../schemas/marca.schema';
import { useEffect } from 'react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  marca: Marca;
  action: (data: Marca) => void;
}

export default function MarcasDialog({ open, onOpenChange, marca, action }: Props) {
  const form = useForm<Marca>({
    resolver: zodResolver(MarcaSchema),
    values: marca
  });

  useEffect(() => {
  if (open) {
    form.reset(marca);
  }
}, [open, marca]);

 

  function onSubmit(data: Marca) {
    action(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} aria-describedby={undefined}>
        <DialogHeader className="pb-4">
          <DialogTitle>
            {marca.marId ? 'Editar Marca' : 'Agregar Marca'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 w-full items-center gap-3">
              <InputForm
                form={form}
                name="marNom"
                label="Marca"
                placeholder="Ingrese el nombre de la marca"
              />
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button className="bg-in-danger hover:bg-in-danger/90 text-white">
                  Cerrar
                </Button>
              </DialogClose>
              <Button
                className="bg-in-success hover:bg-in-success/90 text-white"
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