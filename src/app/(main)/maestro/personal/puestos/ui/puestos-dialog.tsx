import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { InputForm } from '@/app/ui/common/input-form';
import { DialogClose } from '@radix-ui/react-dialog';
import { Puesto, PuestoSchema } from '@/app/(main)/maestro/personal/puestos/schemas/puesto.schema';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  puesto: Puesto;
  action: (data: Puesto) => void;
}

export default function PuestosDialog({ open, onOpenChange, puesto, action }: Props) {
  const form = useForm<Puesto>({
    resolver: zodResolver(PuestoSchema),
    values: puesto
  });

  function onSubmit(data: Puesto) {
    action(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} aria-describedby={undefined}>
        <DialogHeader className="pb-4">
          <DialogTitle>
            {puesto.pstId ? 'Editar Puesto' : 'Agregar Puesto'}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 w-full items-center gap-3">
              <InputForm
                form={form}
                name="pstNom"
                label="Puesto"
                placeholder="Ingrese el nombre del puesto"
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