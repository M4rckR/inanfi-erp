'use client';

import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { usePuesto } from '@/app/(main)/maestro/personal/puestos/stores/puesto.store';
import { defaultPuestoValues } from '@/app/(main)/maestro/personal/puestos/schemas/puesto.schema';
import PuestosFilters from '@/app/(main)/maestro/personal/puestos/ui/puestos-filters';
import PuestosDialog from '@/app/(main)/maestro/personal/puestos/ui/puestos-dialog';
import PuestosAlert from '@/app/(main)/maestro/personal/puestos/ui/puestos-alert';
import { DataTable } from '@/app/ui/common/data-table';
import { columns } from '@/app/(main)/maestro/personal/puestos/columns';
import { defaultPagination } from '@/lib/types/pagination.type';
import { defaultFilterPuestoValues } from '@/app/(main)/maestro/personal/puestos/schemas/filter-puesto.schema';

export default function PuestosTable() {
  const { puesto, getPuestos, setPuesto, savePuesto, changeStatus } = usePuesto();
  const { pagination, paginationChange, clearFilters } = usePuesto();
  const { openModal, setOpenModal } = usePuesto();
  const { openAlert, setOpenAlert } = usePuesto();
  const { data, ...rest } = pagination;

  useEffect(() => {
    clearFilters();
    getPuestos(defaultPagination, defaultFilterPuestoValues);
  }, []);

  const openAddModal = () => {
    setPuesto(defaultPuestoValues);
    setOpenModal(true);
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="text-lg">Listado de puestos</CardTitle>
        <CardAction>
          <Button
            variant={'primary'}
            onClick={openAddModal}
          >
            <Plus /> Agregar
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <PuestosFilters />
        <DataTable columns={columns} data={data} pagination={rest} setPagination={paginationChange} />
      </CardContent>
      <PuestosDialog open={openModal} onOpenChange={setOpenModal} puesto={puesto} action={savePuesto} />
      <PuestosAlert open={openAlert} onOpenChange={setOpenAlert} puesto={puesto} action={changeStatus} />
    </Card>
  )
}