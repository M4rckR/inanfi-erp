'use client';

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MarcasTable from "./ui/marcas-table";



export default function MarcaPage() {
  
  return (
    <div className="flex flex-col gap-4 md:gap-6 md:py-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Marcas</CardTitle>
          <CardDescription>Marcas de InSalud</CardDescription>
        </CardHeader>
      </Card>
      {/* Listado de Marcas */}
      <MarcasTable/>
    </div>
  );
}
