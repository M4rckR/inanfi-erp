import { Button } from '@/components/ui/button';
import { Eraser, Search } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { InputForm } from '@/app/ui/common/input-form';
import {
  FilterModulo,
  FilterModuloSchema
} from '@/app/(main)/maestro/organizacion/modulos/schemas/filter-modulo.schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useModulo } from '@/app/(main)/maestro/organizacion/modulos/stores/modulo.store';
import { ComboboxForm } from '@/app/ui/common/combobox-form';
import { listEstado } from '@/lib/enums/estado.enum';

export default function ModulosFilters() {
  const { filter, filterChange } = useModulo();
  

  const filterForm = useForm<FilterModulo>({
    resolver: zodResolver(FilterModuloSchema),
    values: filter
  })

  function onFilterSubmit(data: FilterModulo) {
    filterChange(data);
  }

  return (
    <Form {...filterForm}>
      <form
        onSubmit={filterForm.handleSubmit(onFilterSubmit)}
        onReset={() => filterForm.reset()}
        className="flex justify-between py-4 gap-4">
        <div className="grid grid-cols-4 w-full items-center gap-3">
          <InputForm
            form={filterForm}
            name="modNom"
            label="Módulo"
            placeholder="Filtrar por módulo"
          />
          <ComboboxForm
            form={filterForm}
            name="modEst"
            label="Estado"
            placeholder="Filtrar por estado"
            data={listEstado}
          />
        </div>
        <div className="flex pt-6">
          <Button type="submit" className="bg-in-primary hover:bg-in-primary/90 text-white">
            <Search /> Buscar
          </Button>
          <Button type="reset" className="ml-2 bg-in-danger hover:bg-in-danger/90 text-white">
            <Eraser /> Limpiar
          </Button>
        </div>
      </form>
    </Form>
  );
}