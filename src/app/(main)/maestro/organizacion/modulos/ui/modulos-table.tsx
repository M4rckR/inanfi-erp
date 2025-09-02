'use client';

import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/app/ui/common/data-table';
import { columns } from '@/app/(main)/maestro/organizacion/modulos/columns';
import { useEffect } from 'react';
import { useModulo } from '@/app/(main)/maestro/organizacion/modulos/stores/modulo.store';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ModulosFilters from '@/app/(main)/maestro/organizacion/modulos/ui/modulos-filters';
import ModulosDialog from '@/app/(main)/maestro/organizacion/modulos/ui/modulos-dialog';
import { defaultModuloValues } from '@/app/(main)/maestro/organizacion/modulos/schemas/modulo.schema';
import ModulosAlert from '@/app/(main)/maestro/organizacion/modulos/ui/modulos-alert';
import { defaultFilterModuloValues } from '@/app/(main)/maestro/organizacion/modulos/schemas/filter-modulo.schema';
import { defaultPagination } from '@/lib/types/pagination.type';

export default function ModulosTable() {
  const { modulo, getModulos, setModulo, saveModulo, changeStatus } = useModulo();
  const { pagination, paginationChange, clearFilters } = useModulo();
  const { openModal, setOpenModal } = useModulo();
  const { openAlert, setOpenAlert } = useModulo();
  const { data, ...rest } = pagination;

  useEffect(() => {
    clearFilters();
    getModulos(defaultPagination, defaultFilterModuloValues);
  }, []);

  const openAddModal = () => {
    setModulo(defaultModuloValues);
    setOpenModal(true);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="text-lg">Listado de módulos</CardTitle>
        <CardAction>
          <Button
            className="bg-in-success hover:bg-in-success/90 text-white"
            onClick={openAddModal}
          >
            <Plus /> Agregar
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ModulosFilters />
        <DataTable columns={columns} data={data} pagination={rest} setPagination={paginationChange} />
      </CardContent>
      <ModulosDialog open={openModal} onOpenChange={setOpenModal} modulo={modulo} action={saveModulo} />
      <ModulosAlert open={openAlert} onOpenChange={setOpenAlert} modulo={modulo} action={changeStatus}/>
    </Card>
  );
}