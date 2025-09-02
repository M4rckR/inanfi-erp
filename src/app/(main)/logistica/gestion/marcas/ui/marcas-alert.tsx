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
import { Marca } from '../schemas/marca.schema';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  marca: Marca;
  action: (marId: number) => void;
}

export default function MarcasAlert({ open, onOpenChange, marca, action }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {marca.marEst === Estado.ACTIVO
              ? `¿Estas seguro de inactivar el puesto "${marca.marNom}"?`
              : `¿Estas seguro de activar el puesto "${marca.marNom}"?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {marca.marEst === Estado.ACTIVO
              ? 'Al inactivar la marca, no estará disponible para los usuarios.'
              : 'Al activar la marca, estará disponible para los usuarios.'}
            <br />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-in-danger hover:bg-in-danger/90 text-white hover:text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-in-success hover:bg-in-success/90 text-white hover:text-white"
            onClick={() => action(marca.marId!)}
          >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}