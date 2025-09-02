'use client '
import { Button } from '@/components/ui/button';
import { Eraser, Search } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { InputForm } from '@/app/ui/common/input-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComboboxForm } from '@/app/ui/common/combobox-form';
import { listEstado } from '@/lib/enums/estado.enum';
import { useEffect } from 'react';
import { useMarca } from '../../marcas/stores/marca.store';
import { useProductoProveedor } from '../stores/producto.store';
import { FilterProductoProveedor, FilterProductoProveedorSchema } from '../schemas/filter-producto.shema';

export default function ProductosProductoFilters() {
  const { filter, filterChange, clearFilters } = useProductoProveedor();
  const { marcas , isLoading: isLoadingMarcas, fetchMarcas  } = useMarca();
  
  const filterForm = useForm<FilterProductoProveedor>({
    resolver: zodResolver(FilterProductoProveedorSchema),
    values: filter,
  });

  useEffect(() => {
    fetchMarcas();
  }, [fetchMarcas]);

  function onFilterSubmit(data: FilterProductoProveedor) {
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

  const marcasDataForCombobox: ComboboxItem[] = marcas
  .filter((m): m is (typeof m & { marNom: string; marId: number }) => m.marNom !== undefined && m.marId !== undefined)
  .map(m => ({label: m.marNom, value: m.marNom}));



  return (
    <Form {...filterForm}>
      <form
        onSubmit={filterForm.handleSubmit(onFilterSubmit)}
        onReset={onFilterReset}
        className="flex justify-between py-4 gap-4">
        <div className="grid grid-cols-4 w-full items-center gap-3">
          <InputForm
            form={filterForm}
            name="prdPvdSku"
            label="SKU"
            placeholder="Filtrar por SKU"
          />
          <ComboboxForm
            form={filterForm}
            name="marNom"
            label="Marca"
            placeholder={isLoadingMarcas ? "Cargando marcas..." : "Filtrar por marca"}
            data={marcasDataForCombobox}
          />
          
          <ComboboxForm
            form={filterForm}
            name="prdPvdEst"
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