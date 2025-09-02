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
import { storeCategoria } from './stores/categoria.store';
import { CategoriaCreateFormData } from './schemas/categoria.schema';

export const columns: ColumnDef<CategoriaCreateFormData>[] = [
  {
    id: 'Id',
    accessorKey: 'catId',
    header: () => {
      const { filter, filterChange } = storeCategoria();
      const [attr, direccion] = filter.sort!.split(',');

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === 'carId') {
          if (direccion === 'ASC') {
            newFilter.sort = 'catId,DESC';
          } else {
            newFilter.sort = 'catId,ASC';
          }
        } else {
          newFilter.sort = 'catId,ASC';
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
          {attr === 'catId' ? direccion === 'ASC' ? (<ArrowDown01 className="ml-2 h-4 w-4" />) : (
            <ArrowDown10 className="ml-2 h-4 w-4" />) : (<ArrowUpDown className="ml-2 h-4 w-4" />)}
        </Button>
      );
    },
  },
  {
    id: 'Categoria',
    accessorKey: 'catNom',
    header: () => {
      const { filter, filterChange } = storeCategoria();
      const [attr, direccion] = filter.sort!.split(',');

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === 'catNom') {
          if (direccion === 'ASC') {
            newFilter.sort = 'catNom,DESC';
          } else {
            newFilter.sort = 'catNom,ASC';
          }
        } else {
          newFilter.sort = 'catNom,ASC';
        }
        filterChange(newFilter);
      }

      return (
        <Button
          variant="ghost"
          className="font-bold uppercase text-xs"
          onClick={handleSortChange}
        >
          Categoria
          {attr === 'catNom' ? direccion === 'ASC' ? (<ArrowDownAZ className="ml-2 h-4 w-4" />) : (
            <ArrowDownZA className="ml-2 h-4 w-4" />) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />)}
        </Button>
      );
    },
  },
  {
    id: 'Estado',
    accessorKey: 'catEst',
    header: () => <div className="font-bold uppercase text-xs">Estado</div>,
    cell: ({ row }) => {
      const estado = row.original.catEst;
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
      const categoria = row.original;
      const { catEst } = categoria;
      const { setCategoria, setOpenModal, setOpenAlert } = storeCategoria();

      const openEditModal = () => {
        setCategoria(categoria);
        setOpenModal(true);
      };
      const openAlert = () => {
        setCategoria(categoria);
        setOpenAlert(true);
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={'outline'} className="border-0 rounded-full bg-white p-0"><EllipsisVertical /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem onClick={openEditModal}>
              <Pencil />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn('text-in-success/75 focus:text-in-success/75', { 'text-in-danger/75 focus:text-in-danger/75': catEst === Estado.ACTIVO })}
              onClick={openAlert}
            >
              {catEst === Estado.ACTIVO ? (
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