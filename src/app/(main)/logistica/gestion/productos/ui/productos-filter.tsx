'use client '
import { Button } from '@/components/ui/button';
import { Eraser, Search } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { InputForm } from '@/app/ui/common/input-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComboboxForm } from '@/app/ui/common/combobox-form';
import { listEstado } from '@/lib/enums/estado.enum';
import { useProducto } from '../stores/productos.storage';
import { FilterProducto, FilterProductoSchema } from '../schemas/filter-producto.schema';
import { useSegmentoStore } from '../../segmentos/stores/segmento.store';
import { useEffect } from 'react';
import { storeCategoria } from '../../categorias/stores/categoria.store';

export default function ProductosFilters() {
  const { filter, filterChange, clearFilters } = useProducto();
  const {categorias, isLoading: isLoadingCategorias, fetchCategorias  } = storeCategoria();
  const { segmentos, isLoading: isLoadingSegmentos, fetchSegmentos } = useSegmentoStore();
  
  const filterForm = useForm<FilterProducto>({
    resolver: zodResolver(FilterProductoSchema),
    values: filter,
  });

  useEffect(() => {
    fetchCategorias();
  }, [fetchCategorias]);

  useEffect(() => {
    fetchSegmentos();
  }, [fetchSegmentos]);

  function onFilterSubmit(data: FilterProducto) {
    filterChange(data);
  };

  function onFilterReset() {
    filterForm.reset(); 
    clearFilters();
  };

  interface ComboboxItem {
    label: string;
    value: string;
  }

  const segmentosDataForCombobox: ComboboxItem[] = segmentos
  .filter((s): s is (typeof s & { sgiNom: string; sgiId: number }) => s.sgiNom !== undefined && s.sgiId !== undefined)
  .map(s => ({label: s.sgiNom, value: s.sgiNom}));
  
  const categoriasDataForCombobox: ComboboxItem[] = categorias
  .filter((c): c is (typeof c & { catNom: string; catId: number }) => c.catNom !== undefined && c.catId !== undefined)
  .map(c => ({label: c.catNom, value: c.catNom}));


  return (
    <Form {...filterForm}>
      <form
        onSubmit={filterForm.handleSubmit(onFilterSubmit)}
        onReset={onFilterReset}
        className="flex justify-between py-4 gap-4">
        <div className="grid grid-cols-4 w-full items-center gap-3">
          <InputForm
            form={filterForm}
            name="prdNom"
            label="Producto"
            placeholder="Filtrar por producto"
          />
          <ComboboxForm
            form={filterForm}
            name="catNom"
            label="Categoría"
            placeholder={isLoadingCategorias ? "Cargando categorías..." : "Filtrar por categoría"}
            data={categoriasDataForCombobox}
          />
          <ComboboxForm
            form={filterForm}
            name="sgiNom"
            label="Segmento"
            placeholder={isLoadingSegmentos ? "Cargando segmentos..." : "Filtrar por segmento"}
            data={segmentosDataForCombobox}
          />
          <ComboboxForm
            form={filterForm}
            name="prdEst"
            label="Estado"
            placeholder="Filtrar por estado"
            data={listEstado}
          />
        </div>
        <div className="flex pt-6 gap-1">
          <Button type="submit" variant={'secondary'}>
            <Search /> Buscar
          </Button> 
          <Button type="reset" variant={'danger'}>
            <Eraser /> Limpiar
          </Button>
        </div>
      </form>
    </Form>
  );
}