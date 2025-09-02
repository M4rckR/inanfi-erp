import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ModulosTable from '@/app/(main)/maestro/organizacion/modulos/ui/modulos-table';

export default function ModulosPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 md:py-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Módulos</CardTitle>
          <CardDescription>
            Módulos del sistema InAnFi
          </CardDescription>
        </CardHeader>
      </Card>
      <ModulosTable />
    </div>
  );
}