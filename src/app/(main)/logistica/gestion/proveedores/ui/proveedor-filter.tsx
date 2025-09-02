'use client '
import { Button } from '@/components/ui/button';
import { Eraser, Search } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { InputForm } from '@/app/ui/common/input-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComboboxForm } from '@/app/ui/common/combobox-form';
import { listEstado } from '@/lib/enums/estado.enum';
import { useProveedor } from '../stores/proveedor.store';
import { FilterProveedor, FilterProveedorSchema } from '../schemas/filter-proveedor.schema';

export default function ProveedoresFilters() {
  const { filter, filterChange, clearFilters } = useProveedor();
  

  const filterForm = useForm<FilterProveedor>({
    resolver: zodResolver(FilterProveedorSchema),
    values: filter,
  })

  function onFilterSubmit(data: FilterProveedor) {
    filterChange(data);
  }

  function onFilterReset() {
    filterForm.reset(); 
    clearFilters();
  }

  return (
    <Form {...filterForm}>
      <form
        onSubmit={filterForm.handleSubmit(onFilterSubmit)}
        onReset={onFilterReset}
        className="flex justify-between py-4 gap-4">
        <div className="grid grid-cols-4 w-full items-center gap-3">
          <InputForm
            form={filterForm}
            name="pvdRazSoc"
            label="Razón Social"
            placeholder="Filtrar por razón social"
          />
          <InputForm
            form={filterForm}
            name="pvdNumDoc"
            label="Número de Documento"
            placeholder="Filtrar por número de documento"
          />
          <ComboboxForm
            form={filterForm}
            name="pvdEst"
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