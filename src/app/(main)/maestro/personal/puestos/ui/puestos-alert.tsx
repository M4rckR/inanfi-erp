import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { Estado } from '@/lib/enums/estado.enum';
import { Puesto } from '@/app/(main)/maestro/personal/puestos/schemas/puesto.schema';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  puesto: Puesto;
  action: (pstId: number) => void;
}

export default function PuestosAlert({ open, onOpenChange, puesto, action }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {puesto.pstEst === Estado.ACTIVO
              ? `¿Estas seguro de inactivar el puesto "${puesto.pstNom}"?`
              : `¿Estas seguro de activar el puesto "${puesto.pstNom}"?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {puesto.pstEst === Estado.ACTIVO
              ? 'Al inactivar el puesto, no estará disponible para los usuarios.'
              : 'Al activar el puesto, estará disponible para los usuarios.'}
            <br />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-in-danger hover:bg-in-danger/90 text-white hover:text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-in-success hover:bg-in-success/90 text-white hover:text-white"
            onClick={() => action(puesto.pstId!)}
          >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}