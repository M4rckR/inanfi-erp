import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Modulo, ModuloSchema } from '@/app/(main)/maestro/organizacion/modulos/schemas/modulo.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { InputForm } from '@/app/ui/common/input-form';
import { DialogClose } from '@radix-ui/react-dialog';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modulo: Modulo;
  action: (data: Modulo) => void;
}

export default function ModulosDialog({ open, onOpenChange, modulo, action }: Props) {
  const form = useForm<Modulo>({
    resolver: zodResolver(ModuloSchema),
    values: modulo
  });

  function onSubmit(data: Modulo) {
    action(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} aria-describedby={undefined}>
        <DialogHeader className="pb-4">
          <DialogTitle>
            {modulo.modId ? 'Editar Módulo' : 'Agregar Módulo'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 w-full items-center gap-3">
              <InputForm
                form={form}
                name="modNom"
                label="Módulo"
                placeholder="Ingrese el nombre del módulo"
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