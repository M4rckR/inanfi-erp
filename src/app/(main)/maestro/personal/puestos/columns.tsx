'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Estado, getEstadoLabel } from '@/lib/enums/estado.enum';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownZA,
  ArrowUpDown,
  EllipsisVertical,
  Pencil,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { Puesto } from '@/app/(main)/maestro/personal/puestos/schemas/puesto.schema';
import { usePuesto as storePuesto } from '@/app/(main)/maestro/personal/puestos/stores/puesto.store';

export const columns: ColumnDef<Puesto>[] = [
  {
    id: 'Id',
    accessorKey: 'pstId',
    header: () => {
      const { filter, filterChange } = storePuesto();
      const [attr, direccion] = filter.sort!.split(',');

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === 'pstId') {
          if (direccion === 'ASC') {
            newFilter.sort = 'pstId,DESC';
          } else {
            newFilter.sort = 'pstId,ASC';
          }
        } else {
          newFilter.sort = 'pstId,ASC';
        }
        filterChange(newFilter);
      }

      return (
        <Button
          variant="ghost"
          className="font-bold uppercase text-xs"
          onClick={handleSortChange}
        >
          Id
          {attr === 'pstId' ? direccion === 'ASC' ? (<ArrowDown01 className="ml-2 h-4 w-4" />) : (
            <ArrowDown10 className="ml-2 h-4 w-4" />) : (<ArrowUpDown className="ml-2 h-4 w-4" />)}
        </Button>
      );
    },
  },
  {
    id: 'Puesto',
    accessorKey: 'pstNom',
    header: () => {
      const { filter, filterChange } = storePuesto();
      const [attr, direccion] = filter.sort!.split(',');

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === 'pstNom') {
          if (direccion === 'ASC') {
            newFilter.sort = 'pstNom,DESC';
          } else {
            newFilter.sort = 'pstNom,ASC';
          }
        } else {
          newFilter.sort = 'pstNom,ASC';
        }
        filterChange(newFilter);
      }

      return (
        <Button
          variant="ghost"
          className="font-bold uppercase text-xs"
          onClick={handleSortChange}
        >
          Puesto
          {attr === 'pstNom' ? direccion === 'ASC' ? (<ArrowDownAZ className="ml-2 h-4 w-4" />) : (
            <ArrowDownZA className="ml-2 h-4 w-4" />) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />)}
        </Button>
      );
    },
  },
  {
    id: 'Estado',
    accessorKey: 'pstEst',
    header: () => <div className="font-bold uppercase text-xs">Estado</div>,
    cell: ({ row }) => {
      const estado = row.original.pstEst;
      return (
        <Badge
          className={cn('bg-in-danger/75 text-white', { 'bg-in-success/75': estado === Estado.ACTIVO })}
        >
          {getEstadoLabel(estado!)}
        </Badge>
      );
    },
  },
  {
    id: 'Acciones',
    header: () => <div className="font-bold uppercase text-xs">Acciones</div>,
    cell: ({ row }) => {
      const puesto = row.original;
      const { pstEst } = puesto;
      const { setPuesto, setOpenModal, setOpenAlert } = storePuesto();

      const openEditModal = () => {
        setPuesto(puesto);
        setOpenModal(true);
      };
      const openAlert = () => {
        setPuesto(puesto);
        setOpenAlert(true);
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-0 rounded-full bg-white p-0"><EllipsisVertical /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={openEditModal}>
              <Pencil />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn('text-in-success/75 focus:text-in-success/75', { 'text-in-danger/75 focus:text-in-danger/75': pstEst === Estado.ACTIVO })}
              onClick={openAlert}
            >
              {pstEst === Estado.ACTIVO ? (
                <>
                  <ToggleLeft className="text-in-danger/75" />
                  Inactivar
                </>
              ) : (
                <>
                  <ToggleRight className="text-in-success/75" />
                  Activar
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];