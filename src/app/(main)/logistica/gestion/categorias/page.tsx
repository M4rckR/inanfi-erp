import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CategoriasTable from "./ui/categorias-table";



export default function CategoriasPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 md:py-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Categorías</CardTitle>
          <CardDescription>Categorías de InSalud</CardDescription>
        </CardHeader>
      </Card>
      {/* Listado de Categorias */}
      <CategoriasTable />
    </div>
  );
}
