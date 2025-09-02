import { Button } from '@/components/ui/button';
import { Eraser, Search } from 'lucide-react';
import { Form } from '@/components/ui/form';
import { InputForm } from '@/app/ui/common/input-form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ComboboxForm } from '@/app/ui/common/combobox-form';
import { listEstado } from '@/lib/enums/estado.enum';
import { usePuesto } from '@/app/(main)/maestro/personal/puestos/stores/puesto.store';
import { FilterPuesto, FilterPuestoSchema } from '@/app/(main)/maestro/personal/puestos/schemas/filter-puesto.schema';

export default function PuestosFilters() {
  const { filter, filterChange } = usePuesto();

  

  const filterForm = useForm<FilterPuesto>({
    resolver: zodResolver(FilterPuestoSchema),
    values: filter,
  })

  function onFilterSubmit(data: FilterPuesto) {
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
            name="pstNom"
            label="Puesto"
            placeholder="Filtrar por puesto"
          />
          <ComboboxForm
            form={filterForm}
            name="pstEst"
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