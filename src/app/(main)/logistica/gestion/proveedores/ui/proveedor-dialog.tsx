import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { InputForm } from "@/app/ui/common/input-form";
import { DialogClose } from "@radix-ui/react-dialog";
import { useEffect } from "react";
import { Proveedor, ProveedorSchema } from "../schemas/proveedor.schema";
import { SelectForm } from "@/app/ui/common/select-form";
import { listBussinessDocumento } from "@/lib/enums/documento.enum";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proveedor: Proveedor;
  action: (data: Proveedor) => void;
}

export default function ProveedoresDialog({
  open,
  onOpenChange,
  proveedor,
  action,
}: Props) {
  const form = useForm<Proveedor>({
    resolver: zodResolver(ProveedorSchema),
    values: proveedor,
  });

  useEffect(() => {
    if (open) {
      form.reset(proveedor);
    }
  }, [open, proveedor]);

  function onSubmit(data: Proveedor) {
    action(data);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        aria-describedby={undefined}
      >
        <DialogHeader className="pb-4">
          <DialogTitle>
            {proveedor.pvdId ? "Editar Proveedor" : "Agregar Proveedor"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >

            <div className="grid grid-cols-1 gap-6">
              <InputForm
                form={form}
                name="pvdNom"
                label="Proveedor"
                placeholder="Ingrese el nombre del Proveedor"
              />
            </div>

            <div className="grid grid-cols-1 gap-6">
              <InputForm
                form={form}
                name="pvdRazSoc"
                label="Razón Social"
                placeholder="Ingrese la Razón Social"
              />
            </div>
      
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectForm
                form={form}
                name="pvdTipDoc"
                label="Tipo de Documento"
                placeholder="Seleccione el tipo de documento"
                data={listBussinessDocumento}
                className="col-span-1"
                valueType="string" 
              />
              <InputForm
                form={form}
                name="pvdNumDoc"
                label="Numero de Documento"
                placeholder="Ingrese el número de documento"
                className="col-span-1"
              />
            </div>

            {/* Agrupación para 'Teléfono' y 'Correo Electrónico' */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputForm
                form={form}
                name="pvdTel"
                label="Teléfono"
                placeholder="Ingrese el Teléfono"
              />
              <InputForm
                form={form}
                name="pvdEma"
                label="Email"
                placeholder="Ingrese el Email"
              />
            </div>

            {/* Campo 'Dirección' en una fila completa */}
            <div className="grid grid-cols-1 gap-6">
              <InputForm
                form={form}
                name="pvdDir"
                label="Dirección"
                placeholder="Ingrese su dirección"
              />
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end gap-2 mt-4">
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
