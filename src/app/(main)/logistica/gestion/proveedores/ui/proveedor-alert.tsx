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
import { Proveedor } from '../schemas/proveedor.schema';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  proveedor: Proveedor;
  action: (pvdId: number) => void;
}

export default function ProveedorAlert({ open, onOpenChange, proveedor, action }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {proveedor.pvdEst === Estado.ACTIVO
              ? `¿Estas seguro de inactivar el puesto "${proveedor.pvdNom}"?`
              : `¿Estas seguro de activar el puesto "${proveedor.pvdNom}"?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {proveedor.pvdEst === Estado.ACTIVO
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
            onClick={() => action(proveedor.pvdId!)}
          >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}