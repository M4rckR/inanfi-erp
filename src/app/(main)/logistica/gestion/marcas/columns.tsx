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
import { Marca } from './schemas/marca.schema';
import { useMarca as storeMarca } from './stores/marca.store';

export const columns: ColumnDef<Marca>[] = [
  {
    id: 'Id',
    accessorKey: 'marId',
    header: () => {
      const { filter, filterChange } = storeMarca();
      const [attr, direccion] = filter.sort!.split(',');

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === 'marId') {
          if (direccion === 'ASC') {
            newFilter.sort = 'marId,DESC';
          } else {
            newFilter.sort = 'marId,ASC';
          }
        } else {
          newFilter.sort = 'marId,ASC';
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
          {attr === 'marId' ? direccion === 'ASC' ? (<ArrowDown01 className="ml-2 h-4 w-4" />) : (
            <ArrowDown10 className="ml-2 h-4 w-4" />) : (<ArrowUpDown className="ml-2 h-4 w-4" />)}
        </Button>
      );
    },
  },
  {
    id: 'Marca',
    accessorKey: 'marNom',
    header: () => {
      const { filter, filterChange } = storeMarca();
      const [attr, direccion] = filter.sort!.split(',');

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === 'marNom') {
          if (direccion === 'ASC') {
            newFilter.sort = 'marNom,DESC';
          } else {
            newFilter.sort = 'marNom,ASC';
          }
        } else {
          newFilter.sort = 'marNom,ASC';
        }
        filterChange(newFilter);
      }

      return (
        <Button
          variant="ghost"
          className="font-bold uppercase text-xs"
          onClick={handleSortChange}
        >
          Marca
          {attr === 'marNom' ? direccion === 'ASC' ? (<ArrowDownAZ className="ml-2 h-4 w-4" />) : (
            <ArrowDownZA className="ml-2 h-4 w-4" />) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />)}
        </Button>
      );
    },
  },
  {
    id: 'Estado',
    accessorKey: 'marEst',
    header: () => <div className="font-bold uppercase text-xs">Estado</div>,
    cell: ({ row }) => {
      const estado = row.original.marEst;
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
      const marca = row.original;
      const { marEst } = marca;
      const { setMarca, setOpenModal, setOpenAlert } = storeMarca();

      const openEditModal = () => {
        setMarca(marca);
        setOpenModal(true);
      };
      const openAlert = () => {
        setMarca(marca);
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
              className={cn('text-in-success/75 focus:text-in-success/75', { 'text-in-danger/75 focus:text-in-danger/75': marEst === Estado.ACTIVO })}
              onClick={openAlert}
            >
              {marEst === Estado.ACTIVO ? (
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