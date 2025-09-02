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
import { Producto } from '../schemas/producto.schema';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  producto: Producto;
  action: (prdId: number) => void;
}

export default function ProductosAlert({ open, onOpenChange, producto, action }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {producto.prdEst === Estado.ACTIVO
              ? `¿Estas seguro de inactivar el producto "${producto.prdNom}"?`
              : `¿Estas seguro de activar el producto "${producto.prdNom}"?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {producto.prdEst === Estado.ACTIVO
              ? 'Al inactivar el producto, no estará disponible para los usuarios.'
              : 'Al activar el producto, estará disponible para los usuarios.'}
            <br />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-in-danger hover:bg-in-danger/90 text-white hover:text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-in-success hover:bg-in-success/90 text-white hover:text-white"
            onClick={() => action(producto.prdId!)}
          >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}