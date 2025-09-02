'use client';

import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { storeCategoria } from "../stores/categoria.store";
import { useEffect, useState } from "react";
import { defaultFilterCategoriaValues } from "../schemas/filter-categoria.schema";

import { defaultPagination } from "@/lib/types/pagination.type";
import { DataTable } from "@/app/ui/common/data-table";
import CategoriasFilters from "./categorias-filter";
import { defaultCategoriaValues } from "../schemas/categoria.schema";
import CategoriasDialog from "./categorias-dialog";
import CategoriasAlert from "./categorias-alert";
import { columns } from "../columns";


export default function CategoriasTable() {
  
  const { categoria, getCategorias, setCategoria, saveCategoria, changeStatus,isLoading } = storeCategoria();
    const { pagination, paginationChange, clearFilters } = storeCategoria();
    const { openModal, setOpenModal } = storeCategoria();
    const { openAlert, setOpenAlert } = storeCategoria();
    const { data, ...rest } = pagination;
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  
    const carga = () => setHasLoadedOnce(true); 

    useEffect(() => {
      clearFilters();
      getCategorias(defaultPagination, defaultFilterCategoriaValues).then(carga);
    }, []);

    

    const openAddModal = () => {
      setCategoria(defaultCategoriaValues);
      setOpenModal(true);
    };


  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="text-lg">Listado de categorias</CardTitle>
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
        <CategoriasFilters />
        <DataTable columns={columns} data={data} pagination={rest} setPagination={paginationChange} isLoading={!hasLoadedOnce || isLoading}/> {/* Aqui se muestran los datos */}
      </CardContent>

      <CategoriasDialog open={openModal} onOpenChange={setOpenModal} categoria={categoria} action={saveCategoria} />
      <CategoriasAlert open={openAlert} onOpenChange={setOpenAlert} categoria={categoria} action={changeStatus} /> 

    </Card>
  )
}
