'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { InputForm } from '@/app/ui/common/input-form';
import { DialogClose } from '@radix-ui/react-dialog';
import { useEffect } from 'react';
import { Producto, ProductoSchema } from '../schemas/producto.schema';
import { TextAreaForm } from '@/app/ui/common/text-area-form';
import { SelectForm } from '@/app/ui/common/select-form';
import { storeCategoria } from '../../categorias/stores/categoria.store';
import { useSegmentoStore } from '../../segmentos/stores/segmento.store';
import { useUnidadestore } from '../../unidades/stores/unidades.store';
import { Estado } from '@/lib/enums/estado.enum';


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
    catEst?: Estado; // Propiedad de estado opcional para filtrar
    sgiEst?: Estado;
    uniEst?: Estado;
  }

  const categoriasDataForSelect: SelectOption[] = categorias
    .map(c => ({
      label: c.catNom as string,
      value: c.catId as number,
      catEst: c.catEst as Estado
    }));

  const segmentosDataForSelect: SelectOption[] = segmentos
    .map(s => ({
      label: s.sgiNom as string,
      value: s.sgiId as number,
      sgiEst: s.sgiEst as Estado
    }));
  
  const unidadesDataForSelect: SelectOption[] = unidades
    .map(u => ({
      label: u.uniNom as string,
      value: u.uniId as number,
      uniEst: u.uniEst as Estado
    }));

  const isAnyDropdownLoading = isLoadingCategorias || isLoadingSegmentos || isLoadingUnidades;

    // --- Lógica mejorada para la lista de categorías ---
  const filteredCategoriasData = categoriasDataForSelect.filter(c => c.catEst === Estado.ACTIVO);
  const selectedCategoria = categoriasDataForSelect.find(item => item.value === producto.catId);
  const finalCategoriasData = Array.from(new Set([
    ...filteredCategoriasData,
    ...(selectedCategoria && selectedCategoria.catEst === Estado.INACTIVO ? [selectedCategoria] : [])
  ]));

  // --- Lógica mejorada para la lista de segmentos ---
  const filteredSegmentosData = segmentosDataForSelect.filter(s => s.sgiEst === Estado.ACTIVO);
  const selectedSegmento = segmentosDataForSelect.find(item => item.value === producto.sgiId);
  const finalSegmentosData = Array.from(new Set([
    ...filteredSegmentosData,
    ...(selectedSegmento && selectedSegmento.sgiEst === Estado.INACTIVO ? [selectedSegmento] : [])
  ]));

  // --- Lógica mejorada para la lista de unidades ---
  const filteredUnidadesData = unidadesDataForSelect.filter(u => u.uniEst === Estado.ACTIVO);
  const selectedUnidad = unidadesDataForSelect.find(item => item.value === producto.uniId);
  const finalUnidadesData = Array.from(new Set([
    ...filteredUnidadesData,
    ...(selectedUnidad && selectedUnidad.uniEst === Estado.INACTIVO ? [selectedUnidad] : [])
  ]));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onInteractOutside={(e) => e.preventDefault()} aria-describedby={undefined}>
        <div className="flex flex-col h-full gap-4">
          <DialogHeader className="pb-4">
            <DialogTitle>
              {producto.prdId ? 'Editar Producto' : 'Agregar Producto'}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                <InputForm
                  form={form}
                  name="prdNom"
                  label="Producto"
                  placeholder="Ingrese el nombre del producto"
                  className="col-span-3"
                />

                <SelectForm
                  form={form}
                  name="uniId"
                  label="Unidad"
                  placeholder={isAnyDropdownLoading ? "Cargando unidades..." : "unidad"}
                  data={finalUnidadesData}
                  className="col-span-1"
                  valueType="number"
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
                  data={ finalCategoriasData }
                  className="col-span-1"
                  valueType="number"
                />
                <SelectForm
                  form={form}
                  name="sgiId"
                  label="Segmento"
                  placeholder={isAnyDropdownLoading ? "Cargando segmentos..." : "Seleccione el segmento"}
                  data={ finalSegmentosData }
                  className="col-span-1"
                  valueType="number"
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
