'use client '
import { Button } from '@/components/ui/button';
import { Eraser, Search } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { InputForm } from '@/app/ui/common/input-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComboboxForm } from '@/app/ui/common/combobox-form';
import { listEstado } from '@/lib/enums/estado.enum';
import { storeCategoria } from '../stores/categoria.store';
import { FilterCategoria, FilterCategoriaSchema } from '../schemas/filter-categoria.schema';

export default function CategoriasFilters() {
  const { filter, filterChange, clearFilters } = storeCategoria();
  

  const filterForm = useForm<FilterCategoria>({
    resolver: zodResolver(FilterCategoriaSchema),
    values: filter,
  })

  function onFilterSubmit(data: FilterCategoria) {
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
            name="catNom"
            label="Categoria"
            placeholder="Filtrar por categoria"
          />
          <ComboboxForm
            form={filterForm}
            name="catEst"
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