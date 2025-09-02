'use client'
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { defaultPagination } from "@/lib/types/pagination.type";
import { DataTable } from "@/app/ui/common/data-table";
import ProductosProductoFilters from "./producto-filter";
import ProductosProveedorDialog from "./producto-dialog";
import ProductosProveedorAlert from "./producto-alert";
import { useProductoProveedor } from "../stores/producto.store";
import { defaultFilterProductoProveedorValues } from "../schemas/filter-producto.shema";
import { defaultProductoProveedorValues } from "../schemas/producto.schema";
import { columns } from "../[id]/productos/colums";

interface Props {
  id : number
}

export default function ProductosProveedoresTable({id} : Props) {

    const { productoProveedor, getProductosProveedor,getProveedor, setProductoProveedor,saveProductoProveedor, changeStatus, isLoading } = useProductoProveedor();
    const { pagination, paginationChange, clearFilters } = useProductoProveedor();
    const { openModal, setOpenModal } = useProductoProveedor();
    const { openAlert, setOpenAlert } = useProductoProveedor();
    const { data, ...rest } = pagination;
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);


    const carga = () => setHasLoadedOnce(true); 
  
    useEffect(() => {
      clearFilters(id);
      getProveedor(id)
      getProductosProveedor( id, defaultPagination, defaultFilterProductoProveedorValues).then(carga);
    }, []);

     
  
    const openAddModal = () => {
      setProductoProveedor(defaultProductoProveedorValues);
      console.log(defaultFilterProductoProveedorValues);
      
      setOpenModal(true);
    };


  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="text-lg">Listado de Productos del Proveedor 📦</CardTitle>
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
        <ProductosProductoFilters />
        <DataTable columns={columns} data={data} pagination={rest} setPagination={paginationChange} isLoading={!hasLoadedOnce || isLoading}/> {/* Aqui se muestran los datos */}
      </CardContent>

      <ProductosProveedorDialog open={openModal} onOpenChange={setOpenModal} productoProveedor={productoProveedor} action={saveProductoProveedor} id={id}/>
      <ProductosProveedorAlert open={openAlert} onOpenChange={setOpenAlert} productoProveedor={productoProveedor} action={changeStatus} /> 

    </Card>
  )
}