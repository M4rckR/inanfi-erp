'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { InputForm } from '@/app/ui/common/input-form';
import { DialogClose } from '@radix-ui/react-dialog';
import { useEffect } from 'react';

import { ProductoProveedor, ProductoProveedorSchema } from '../schemas/producto.schema';
import { useMarca } from '../../marcas/stores/marca.store';
import { useProducto } from '../../productos/stores/productos.storage';
import { useProductoProveedor } from '../stores/producto.store';
import { SelectCombobox } from '@/app/ui/common/select-combobox-form';
import { Estado } from '@/lib/enums/estado.enum';



interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productoProveedor: ProductoProveedor;
  action: (id:number, data: ProductoProveedor) => void;
  id: number;
}

export default function ProductosProveedorDialog( { id, open, onOpenChange, productoProveedor, action }: Props) {

  const { getProveedor } = useProductoProveedor();
  
  const { productos , isLoading : isLoadingProductos, fetchProductos } = useProducto();   
  const { marcas , isLoading: isLoadingMarcas, fetchMarcas } = useMarca();

  const form = useForm<ProductoProveedor>({
    resolver: zodResolver(ProductoProveedorSchema),
    values: productoProveedor
  });

  useEffect(() => {
    if (open) {
      form.reset(productoProveedor);
      fetchProductos();
      fetchMarcas();
      getProveedor(id)
    }
  }, [open, id, productoProveedor, form, fetchProductos, fetchMarcas]);

  function onSubmit(data: ProductoProveedor) {
    action(id,data);
  };

  const isAnyDropdownLoading = isLoadingProductos || isLoadingMarcas;

  const isEditing = !!productoProveedor.prdPvdId;

  const productosDataForCombobox = productos
    .filter((p) => p.prdNom !== undefined && p.prdId !== undefined && p.prdEst === Estado.ACTIVO)
    .map(p => ({ label: p.prdNom as string, value: p.prdId as number }));

  const marcasDataForCombobox = marcas
    .filter((m) => m.marNom !== undefined && m.marId !== undefined && m.marEst === Estado.ACTIVO)
    .map(m => ({ label: m.marNom as string, value: m.marId as number }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} aria-describedby={undefined}>
        <div className="flex flex-col h-full gap-4">
          <DialogHeader className="pb-4">
            <DialogTitle>
              {productoProveedor.prdPvdId ? 'Editar Producto' : 'Agregar Producto'}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <SelectCombobox
                form={form}
                name="prdId"
                label="Producto"
                placeholder={isAnyDropdownLoading ? "Cargando productos..." : "Seleccione el producto"}
                data={productosDataForCombobox}
                className="col-span-1"
                valueType="number"
                disabled={isEditing}
              
              />
              
              <SelectCombobox
                form={form}
                name="marId"
                label="Marca"
                placeholder={isAnyDropdownLoading ? "Cargando marcas..." : "Seleccione la marca"}
                data={marcasDataForCombobox}
                className="col-span-1"
                valueType="number"
                disabled={isEditing}
               
              />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <InputForm
                  form={form}
                  name="prdPvdSku"
                  label="SKU"
                  placeholder="Ingrese el SKU del producto"
                  className="col-span-3"
                  type='string'
                />

                <InputForm
                  form={form}
                  name="prdPvdPre"
                  label="Precio"
                  placeholder="0.00"
                  className="col-span-1"
                  type='number'
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
        </div>  
      </DialogContent>
    </Dialog>
  );
}
