'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputForm } from '@/app/ui/common/input-form';
import { useEffect } from 'react';
import { Producto, ProductoSchema } from '../schemas/producto.schema';
import { TextAreaForm } from '@/app/ui/common/text-area-form';
import { SelectForm } from '@/app/ui/common/select-form';
import { storeCategoria } from '../../categorias/stores/categoria.store';
import { useSegmentoStore } from '../../segmentos/stores/segmento.store';
import { useUnidadestore } from '../../unidades/stores/unidades.store';


interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  producto: Producto;
  action: (data: Producto) => void;
}

export default function ProductosDialog({ open, onOpenChange, producto, action }: Props) {

  const { categorias, isLoading: isLoadingCategorias, fetchCategorias } = storeCategoria();
  const { segmentos,isLoading:  isLoadingSegmentos, fetchSegmentos } = useSegmentoStore();
  const { unidades,isLoading:  isLoadingUnidades, fetchUnidades } = useUnidadestore();

  const form = useForm<Producto>({
    resolver: zodResolver(ProductoSchema),
    values: producto // Los valores iniciales vienen de las props (ya aplanados del store)
  });

  // Efecto para cargar las opciones (categorías, segmentos, unidades) cuando el diálogo se abre
  useEffect(() => {
    if (open) {
      form.reset(producto); // Siempre resetear el formulario con el producto actual (ya aplanado)
      fetchCategorias();
      fetchSegmentos();
      fetchUnidades();
    }
  }, [open, producto, form, fetchCategorias, fetchSegmentos, fetchUnidades]); // Asegúrate de que 'producto' esté en las dependencias

  function onSubmit(data: Producto) {
    action(data);
  };

  interface SelectOption {
    label: string;
    value: string | number;
  }

  const categoriasDataForSelect: SelectOption[] = categorias
    /* .filter(c => c.catNom !== undefined && c.catId !== undefined) */
    .map(c => ({
      label: c.catNom as string,
      value: c.catId as number,
    }));

  const segmentosDataForSelect: SelectOption[] = segmentos
   /*  .filter(s => s.sgiNom !== undefined && s.sgiId !== undefined) */
    .map(s => ({
      label: s.sgiNom as string,
      value: s.sgiId as number,
    }));
  
  const unidadesDataForSelect: SelectOption[] = unidades
    /* .filter(u => u.uniNom !== undefined && u.uniId !== undefined) */
    .map(u => ({
      label: u.uniNom as string,
      value: u.uniId as number,
    }));

  const isAnyDropdownLoading = isLoadingCategorias || isLoadingSegmentos || isLoadingUnidades;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} aria-describedby={undefined}>
        <div className="flex flex-col h-full gap-4">
          <DialogHeader className="pb-4">
            <DialogTitle>
                Detalle Producto
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                <InputForm
                  form={form}
                  name="prdNom"
                  label="Producto"
                  placeholder="Ingrese el nombre de la producto"
                  className="col-span-3"
                />

                <SelectForm
                  form={form}
                  name="uniId"
                  label="Unidad"
                  placeholder={isAnyDropdownLoading ? "Cargando unidades..." : "unidad"}
                  data={unidadesDataForSelect}
                  className="col-span-1"
                />

              </div>
              
              <TextAreaForm 
                form={form}
                name='prdDes'
                label='Descripción'
                placeholder="Ingrese la descripción del producto"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectForm
                  form={form}
                  name="catId"
                  label="Categoría"
                  placeholder={isAnyDropdownLoading ? "Cargando categorías..." : "Seleccione la categoría"}
                  data={categoriasDataForSelect}
                  className="col-span-1"
                />
                <SelectForm
                  form={form}
                  name="sgiId"
                  label="Segmento"
                  placeholder={isAnyDropdownLoading ? "Cargando segmentos..." : "Seleccione el segmento"}
                  data={segmentosDataForSelect}
                  className="col-span-1"
                />
              </div>
             
              

              
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
