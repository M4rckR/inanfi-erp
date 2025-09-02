"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Estado, getEstadoLabel } from "@/lib/enums/estado.enum";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ArrowDown01,
  ArrowDown10,
  ArrowDownAZ,
  ArrowDownZA,
  ArrowUpDown,
  BadgePlus,
  EllipsisVertical,
  Pencil,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { Proveedor } from "./schemas/proveedor.schema";
import { useProveedor as storeProveedor } from "./stores/proveedor.store";
import { useRouter } from "next/navigation";


export const columns: ColumnDef<Proveedor>[] = [
  {
    id: "Id",
    accessorKey: "pvdId",
    header: () => {
      const { filter, filterChange } = storeProveedor();
      const [attr, direccion] = filter.sort!.split(",");

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === "pvdId") {
          if (direccion === "ASC") {
            newFilter.sort = "pvdId,DESC";
          } else {
            newFilter.sort = "pvdId,ASC";
          }
        } else {
          newFilter.sort = "pvdId,ASC";
        }
        filterChange(newFilter);
      };

      return (
        <Button
          variant="ghost"
          className="font-bold uppercase text-xs"
          onClick={handleSortChange}
        >
          Id
          {attr === "pvdId" ? (
            direccion === "ASC" ? (
              <ArrowDown01 className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDown10 className="ml-2 h-4 w-4" />
            )
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    id: "Proveedor",
    accessorKey: "pvdNom",
    header: () => {
      const { filter, filterChange } = storeProveedor();
      const [attr, direccion] = filter.sort!.split(",");

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === "pvdNom") {
          if (direccion === "ASC") {
            newFilter.sort = "pvdNom,DESC";
          } else {
            newFilter.sort = "pvdNom,ASC";
          }
        } else {
          newFilter.sort = "pvdNom,ASC";
        }
        filterChange(newFilter);
      };

      return (
        <Button
          variant="ghost"
          className="font-bold uppercase text-xs"
          onClick={handleSortChange}
        >
          Proveedor
          {attr === "pvdNom" ? (
            direccion === "ASC" ? (
              <ArrowDownAZ className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDownZA className="ml-2 h-4 w-4" />
            )
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    id: "Razón Social",
    accessorKey: "pvdRazSoc",
    header: () => {
      const { filter, filterChange } = storeProveedor();
      const [attr, direccion] = filter.sort!.split(",");

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === "pvdRazSoc") {
          if (direccion === "ASC") {
            newFilter.sort = "pvdRazSoc,DESC";
          } else {
            newFilter.sort = "pvdRazSoc,ASC";
          }
        } else {
          newFilter.sort = "pvdRazSoc,ASC";
        }
        filterChange(newFilter);
      };

      return (
        <Button
          variant="ghost"
          className="font-bold uppercase text-xs"
          onClick={handleSortChange}
        >
          Razón Social
          {attr === "pvdRazSoc" ? (
            direccion === "ASC" ? (
              <ArrowDownAZ className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDownZA className="ml-2 h-4 w-4" />
            )
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    id: 'Documento',
    header: () => <div className="font-bold uppercase text-xs">Documento</div>,
    cell: ({ row }) => {
      const { pvdTipDoc, pvdNumDoc } = row.original;
      return (
        <div className="flex flex-col">
          <span>{pvdNumDoc}</span>
          <span className="text-xs text-muted-foreground">{pvdTipDoc}</span>
        </div>
      );
    },
  },
  {
    id: "Contacto",
    accessorKey: "pvdTel",
    header: () => {
      const { filter, filterChange } = storeProveedor();
      const [attr, direccion] = filter.sort!.split(",");

      const handleSortChange = () => {
        const newFilter = { ...filter };
        if (attr === "pvdTel") {
          if (direccion === "ASC") {
            newFilter.sort = "pvdTel,DESC";
          } else {
            newFilter.sort = "pvdTel,ASC";
          }
        } else {
          newFilter.sort = "pvdTel,ASC";
        }
        filterChange(newFilter);
      };

      return (
        <Button
          variant="ghost"
          className="font-bold uppercase text-xs"
          onClick={handleSortChange}
        >
          Contacto
          {attr === "pvdTel" ? (
            direccion === "ASC" ? (
              <ArrowDownAZ className="ml-2 h-4 w-4" />
            ) : (
              <ArrowDownZA className="ml-2 h-4 w-4" />
            )
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </Button>
      );
    },
  },
  {
    id: "Estado",
    accessorKey: "pvdEst",
    header: () => <div className="font-bold uppercase text-xs">Estado</div>,
    cell: ({ row }) => {
      const estado = row.original.pvdEst;
      return (
        <Badge
          className={cn("bg-in-danger/75 text-white", {
            "bg-in-success/75": estado === Estado.ACTIVO,
          })}
        >
          {getEstadoLabel(estado!)}
        </Badge>
      );
    },
  },
  {
    id: "Acciones",
    header: () => <div className="font-bold uppercase text-xs">Acciones</div>,
    cell: ({ row }) => {
      const proveedor = row.original;
      const { pvdEst, pvdId } = proveedor;
      const { setProveedor, setOpenModal, setOpenAlert } = storeProveedor();
      const router = useRouter();

      const openEditModal = () => {
        setProveedor(proveedor);
        setOpenModal(true);
      };
      const openAlert = () => {
        setProveedor(proveedor);
        setOpenAlert(true);
      };

      const handleNavigateToProducts = () => {
        router.push(`/logistica/gestion/proveedores/${pvdId}/productos`);
      };


      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-0 rounded-full bg-white p-0"
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={handleNavigateToProducts}
            >
                <BadgePlus />
                Producto
            </DropdownMenuItem>
            <DropdownMenuItem onClick={openEditModal}>
              <Pencil />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn("text-in-success/75 focus:text-in-success/75", {
                "text-in-danger/75 focus:text-in-danger/75":
                  pvdEst === Estado.ACTIVO,
              })}
              onClick={openAlert}
            >
              {pvdEst === Estado.ACTIVO ? (
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
