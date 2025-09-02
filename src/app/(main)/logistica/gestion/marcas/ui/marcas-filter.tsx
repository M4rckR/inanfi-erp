'use client '
import { Button } from '@/components/ui/button';
import { Eraser, Search } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { InputForm } from '@/app/ui/common/input-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComboboxForm } from '@/app/ui/common/combobox-form';
import { listEstado } from '@/lib/enums/estado.enum';
import { useMarca } from '../stores/marca.store';
import { FilterMarca, FilterMarcaSchema } from '../schemas/filter-marca.schema';

export default function MarcasFilters() {
  const { filter, filterChange, clearFilters } = useMarca();
  

  const filterForm = useForm<FilterMarca>({
    resolver: zodResolver(FilterMarcaSchema),
    values: filter,
  })

  function onFilterSubmit(data: FilterMarca) {
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
            name="marNom"
            label="Marca"
            placeholder="Filtrar por marca"
          />
          <ComboboxForm
            form={filterForm}
            name="marEst"
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