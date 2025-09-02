'use client';

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ProductosTable from "./ui/productos-table";



export default function ProductoPage() {
  
  return (
    <div className="flex flex-col gap-4 md:gap-6 md:py-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Productos</CardTitle>
          <CardDescription>Productos de InSalud</CardDescription>
        </CardHeader>
      </Card>
      {/* Listado de Productos */}
      <ProductosTable/>
    </div>
  );
}
