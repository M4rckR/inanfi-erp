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
import { Producto } from './schemas/producto.schema';
import { useProducto as storeProducto } from './stores/productos.storage';


export const columns: ColumnDef<Producto>[] = [
  {
    id: 'Id',
    accessorKey: 'prdId',
    header: () => {
      const { filter, filterChange } = storeProducto();
      const [attr, direccion] = filter.sort!.split(',');

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === 'prdId') {
          if (direccion === 'ASC') {
            newFilter.sort = 'prdId,DESC';
          } else {
            newFilter.sort = 'prdId,ASC';
          }
        } else {
          newFilter.sort = 'prdId,ASC';
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
          {attr === 'prdId' ? direccion === 'ASC' ? (<ArrowDown01 className="ml-2 h-4 w-4" />) : (
            <ArrowDown10 className="ml-2 h-4 w-4" />) : (<ArrowUpDown className="ml-2 h-4 w-4" />)}
        </Button>
      );
    },
  },
  {
    id: 'Producto',
    accessorKey: 'prdNom',
    header: () => {
      const { filter, filterChange } = storeProducto();
      const [attr, direccion] = filter.sort!.split(',');

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === 'prdNom') {
          if (direccion === 'ASC') {
            newFilter.sort = 'prdNom,DESC';
          } else {
            newFilter.sort = 'prdNom,ASC';
          }
        } else {
          newFilter.sort = 'prdNom,ASC';
        }
        filterChange(newFilter);
      }

      return (
        <Button
          variant="ghost"
          className="font-bold uppercase text-xs"
          onClick={handleSortChange}
        >
          Producto
          {attr === 'prdNom' ? direccion === 'ASC' ? (<ArrowDownAZ className="ml-2 h-4 w-4" />) : (
            <ArrowDownZA className="ml-2 h-4 w-4" />) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />)}
        </Button>
      );
    },
  },
  {
    id: 'Categoria',
    accessorKey: 'cat.catNom',
    header: () => {
      const { filter, filterChange } = storeProducto();
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
    id: 'Segmento',
    accessorKey: 'sgi.sgiNom',
    header: () => {
      const { filter, filterChange } = storeProducto();
      const [attr, direccion] = filter.sort!.split(',');

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === 'sgiNom') {
          if (direccion === 'ASC') {
            newFilter.sort = 'sgiNom,DESC';
          } else {
            newFilter.sort = 'sgiNom,ASC';
          }
        } else {
          newFilter.sort = 'sgiNom,ASC';
        }
        filterChange(newFilter);
      }

      return (
        <Button
          variant="ghost"
          className="font-bold uppercase text-xs"
          onClick={handleSortChange}
        >
          Segmentos
          {attr === 'sgiNom' ? direccion === 'ASC' ? (<ArrowDownAZ className="ml-2 h-4 w-4" />) : (
            <ArrowDownZA className="ml-2 h-4 w-4" />) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />)}
        </Button>
      );
    },
  },
  {
    id: 'Estado',
    accessorKey: 'prdEst',
    header: () => <div className="font-bold uppercase text-xs">Estado</div>,
    cell: ({ row }) => {
      const estado = row.original.prdEst;
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
      const producto = row.original;
      const { prdEst } = producto;
      const { setProducto, setOpenModal, setOpenAlert } = storeProducto();

      const openEditModal = () => {
        setProducto(producto);
        setOpenModal(true);
      };
      const openAlert = () => {
        setProducto(producto);
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
              className={cn('text-in-success/75 focus:text-in-success/75', { 'text-in-danger/75 focus:text-in-danger/75': prdEst === Estado.ACTIVO })}
              onClick={openAlert}
            >
              {prdEst === Estado.ACTIVO ? (
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