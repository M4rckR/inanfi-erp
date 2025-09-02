'use client'
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { defaultPagination } from "@/lib/types/pagination.type";
import { DataTable } from "@/app/ui/common/data-table";
import { useProveedor } from "../stores/proveedor.store";
import { defaultFilterProveedorValues } from "../schemas/filter-proveedor.schema";
import { defaultProveedoresValues } from "../schemas/proveedor.schema";
import ProveedoresFilters from "./proveedor-filter";
import ProveedoresDialog from "./proveedor-dialog";
import ProveedorAlert from "./proveedor-alert";
import { columns } from "../colums";


export default function ProveedoresTable() {
  
  const { proveedor, getProveedores, setProveedor, saveProveedor, changeStatus, isLoading } = useProveedor();
    const { pagination, paginationChange, clearFilters } = useProveedor();
    const { openModal, setOpenModal } = useProveedor();
    const { openAlert, setOpenAlert } = useProveedor();
    const { data, ...rest } = pagination;
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    const carga = () => setHasLoadedOnce(true); 
  
    useEffect(() => {
      clearFilters();
      getProveedores(defaultPagination, defaultFilterProveedorValues).then(carga);
    }, []);

     
  
    const openAddModal = () => {
      setProveedor(defaultProveedoresValues);
      setOpenModal(true);
    };


  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="text-lg">Listado de Proveedores</CardTitle>
        <CardAction>
          <Button
            variant={"primary"}
            onClick={openAddModal}
          >
            <Plus /> Agregar
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <ProveedoresFilters />
        <DataTable columns={columns} data={data} pagination={rest} setPagination={paginationChange} isLoading={!hasLoadedOnce || isLoading}/> {/* Aqui se muestran los datos */}
      </CardContent>

      <ProveedoresDialog open={openModal} onOpenChange={setOpenModal} proveedor={proveedor} action={saveProveedor} />
      <ProveedorAlert open={openAlert} onOpenChange={setOpenAlert} proveedor={proveedor} action={changeStatus} /> 

    </Card>
  )
}
