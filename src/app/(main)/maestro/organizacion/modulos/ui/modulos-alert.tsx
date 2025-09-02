import { Modulo } from '@/app/(main)/maestro/organizacion/modulos/schemas/modulo.schema';
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

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  modulo: Modulo;
  action: (modId: number) => void;
}

export default function ModulosAlert({ open, onOpenChange, modulo, action }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {modulo.modEst === Estado.ACTIVO
              ? `¿Estas seguro de inactivar el módulo "${modulo.modNom}"?`
              : `¿Estas seguro de activar el módulo "${modulo.modNom}"?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {modulo.modEst === Estado.ACTIVO
              ? 'Al inactivar el módulo, no estará disponible para los usuarios.'
              : 'Al activar el módulo, estará disponible para los usuarios.'}
            <br />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-in-danger hover:bg-in-danger/90 text-white hover:text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-in-success hover:bg-in-success/90 text-white hover:text-white"
            onClick={() => action(modulo.modId!)}
          >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}