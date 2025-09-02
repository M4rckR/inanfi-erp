import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PuestosTable from '@/app/(main)/maestro/personal/puestos/ui/puestos-table';

export default function PuestosPage() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 md:py-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Puestos</CardTitle>
          <CardDescription>
            Puestos laborales de InSalud
          </CardDescription>
        </CardHeader>
      </Card>
      <PuestosTable />
    </div>
  );
}