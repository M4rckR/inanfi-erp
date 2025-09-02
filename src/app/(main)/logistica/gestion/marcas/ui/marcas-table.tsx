'use client'
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { defaultPagination } from "@/lib/types/pagination.type";
import { DataTable } from "@/app/ui/common/data-table";
import { useMarca } from "../stores/marca.store";
import { defaultFilterMarcaValues } from "../schemas/filter-marca.schema";
import { defaultMarcaValues } from "../schemas/marca.schema";
import MarcasFilters from "./marcas-filter";
import { columns } from "../columns";
import MarcasDialog from "./marcas-dialog";
import MarcasAlert from "./marcas-alert";


export default function MarcasTable() {
  
  const { marca, getMarcas, setMarca, saveMarca, changeStatus, isLoading } = useMarca();
    const { pagination, paginationChange, clearFilters } = useMarca();
    const { openModal, setOpenModal } = useMarca();
    const { openAlert, setOpenAlert } = useMarca();
    const { data, ...rest } = pagination;
    const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

    const carga = () => setHasLoadedOnce(true); 
  
    useEffect(() => {
      clearFilters();
      getMarcas(defaultPagination, defaultFilterMarcaValues).then(carga);
    }, []);

     
  
    const openAddModal = () => {
      setMarca(defaultMarcaValues);
      setOpenModal(true);
    };


  return (
    <Card>
      <CardHeader className="flex justify-between">
        <CardTitle className="text-lg">Listado de Marcas</CardTitle>
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
        <MarcasFilters />
        <DataTable columns={columns} data={data} pagination={rest} setPagination={paginationChange} isLoading={!hasLoadedOnce || isLoading}/> {/* Aqui se muestran los datos */}
      </CardContent>

      <MarcasDialog open={openModal} onOpenChange={setOpenModal} marca={marca} action={saveMarca} />
      <MarcasAlert open={openAlert} onOpenChange={setOpenAlert} marca={marca} action={changeStatus} /> 

    </Card>
  )
}
