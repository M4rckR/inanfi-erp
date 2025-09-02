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
import { ProductoProveedor } from '../../schemas/producto.schema';
import { useProductoProveedor as storeProductoProveedor } from '../../stores/producto.store';


export const columns: ColumnDef<ProductoProveedor>[] = [
  {
    id: 'Id',
    accessorKey: 'prdPvdId',
    header: () => {
      const { filter, filterChange } = storeProductoProveedor();
      const [attr, direccion] = filter.sort!.split(',');

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === 'prdPvdId') {
          if (direccion === 'ASC') {
            newFilter.sort = 'prdPvdId,DESC';
          } else {
            newFilter.sort = 'prdPvdId,ASC';
          }
        } else {
          newFilter.sort = 'prdPvdId,ASC';
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
          {attr === 'prdPvdId' ? direccion === 'ASC' ? (<ArrowDown01 className="ml-2 h-4 w-4" />) : (
            <ArrowDown10 className="ml-2 h-4 w-4" />) : (<ArrowUpDown className="ml-2 h-4 w-4" />)}
        </Button>
      );
    },
  },
  {
    id: 'Producto',
    accessorKey: 'prd.prdNom',
    header: () => {
      const { filter, filterChange } = storeProductoProveedor();
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
    id: 'Marca',
    accessorKey: 'mar.marNom',
    header: () => {
      const { filter, filterChange } = storeProductoProveedor();
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
    id: 'SKU',
    accessorKey: 'prdPvdSku',
    header: () => {
      const { filter, filterChange } = storeProductoProveedor();
      const [attr, direccion] = filter.sort!.split(',');

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === 'prdPvdSku') {
          if (direccion === 'ASC') {
            newFilter.sort = 'prdPvdSku,DESC';
          } else {
            newFilter.sort = 'prdPvdSku,ASC';
          }
        } else {
          newFilter.sort = 'prdPvdSku,ASC';
        }
        filterChange(newFilter);
      }

      return (
        <Button
          variant="ghost"
          className="font-bold uppercase text-xs"
          onClick={handleSortChange}
        >
          SKU
          {attr === 'prdPvdSku' ? direccion === 'ASC' ? (<ArrowDownAZ className="ml-2 h-4 w-4" />) : (
            <ArrowDownZA className="ml-2 h-4 w-4" />) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />)}
        </Button>
      );
    },
  },
  {
    id: 'Precio',
    accessorKey: 'prdPvdPre',
    header: () => {
      const { filter, filterChange } = storeProductoProveedor();
      const [attr, direccion] = filter.sort!.split(',');

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === 'prdPvdPre') {
          if (direccion === 'ASC') {
            newFilter.sort = 'prdPvdPre,DESC';
          } else {
            newFilter.sort = 'prdPvdPre,ASC';
          }
        } else {
          newFilter.sort = 'prdPvdPre,ASC';
        }
        filterChange(newFilter);
      }

      return (
        <Button
          variant="ghost"
          className="font-bold uppercase text-xs"
          onClick={handleSortChange}
        >
          Precio
          {attr === 'prdPvdPre' ? direccion === 'ASC' ? (<ArrowDownAZ className="ml-2 h-4 w-4" />) : (
            <ArrowDownZA className="ml-2 h-4 w-4" />) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />)}
        </Button>
      );
    },
  },
  {
    id: 'Estado',
    accessorKey: 'prdPvdEst',
    header: () => <div className="font-bold uppercase text-xs">Estado</div>,
    cell: ({ row }) => {
      const estado = row.original.prdPvdEst;
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
      const { prdPvdEst } = producto;
      const { setProductoProveedor, setOpenModal, setOpenAlert } = storeProductoProveedor();

      const openEditModal = () => {
        setProductoProveedor(producto);
        setOpenModal(true);
      };
      const openAlert = () => {
        setProductoProveedor(producto);
        setOpenAlert(true);
      };
      /* const openViewModal = (productoToView: ProductoProveedor) => {
          setProductoProveedor(productoToView);
          setOpenModal(true);
      }; */
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
              className={cn('text-in-success/75 focus:text-in-success/75', { 'text-in-danger/75 focus:text-in-danger/75': prdPvdEst === Estado.ACTIVO })}
              onClick={openAlert}
            >
              {prdPvdEst === Estado.ACTIVO ? (
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