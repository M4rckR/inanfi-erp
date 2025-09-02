'use client'
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { defaultPagination } from "@/lib/types/pagination.type";
import { DataTable } from "@/app/ui/common/data-table";
import { useProducto } from "../stores/productos.storage";
import { defaultFilterProductoValues } from "../schemas/filter-producto.schema";
import { defaultProductoValues } from "../schemas/producto.schema";
import ProductosFilters from "./productos-filter";
import ProductosDialog from "./productos-dialog";
import ProductosAlert from "./productos-alert";
import { columns } from "../columns";


export default function ProductosTable() {
  
  const { producto, getProductos, setProducto, saveProducto, changeStatus, isLoading } = useProducto();
    const { pagination, paginationChange, clearFilters } = useProducto();
    const { openModal, setOpenModal } = useProducto();
    const { openAlert, setOpenAlert } = useProducto();
    const { data, ...rest } = pagination;
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
    

    const carga = () => setHasLoadedOnce(true); 
  
    useEffect(() => {
      clearFilters();
      getProductos(defaultPagination, defaultFilterProductoValues).then(carga);
    }, []);

     
  
    const openAddModal = () => {
      setProducto(defaultProductoValues);
      setOpenModal(true);
    };


  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="text-lg">Listado de Productos</CardTitle>
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
        <ProductosFilters />
        <DataTable columns={columns} data={data} pagination={rest} setPagination={paginationChange} isLoading={!hasLoadedOnce || isLoading}/> {/* Aqui se muestran los datos */}
      </CardContent>

      <ProductosDialog open={openModal} onOpenChange={setOpenModal} producto={producto} action={saveProducto} />
      <ProductosAlert open={openAlert} onOpenChange={setOpenAlert} producto={producto} action={changeStatus} /> 

    </Card>
  )
}