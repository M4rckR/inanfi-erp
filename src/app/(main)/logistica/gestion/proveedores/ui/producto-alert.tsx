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
import { ProductoProveedor } from '../schemas/producto.schema';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productoProveedor: ProductoProveedor;
  action: (prdPvdId: number) => void;
}

export default function ProductosProveedorAlert({ open, onOpenChange, productoProveedor, action }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {productoProveedor.prdPvdEst === Estado.ACTIVO
              ? `¿Estas seguro de inactivar el producto "${productoProveedor.prdPvdEst}"?`
              : `¿Estas seguro de activar el producto "${productoProveedor.prdPvdEst}"?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {productoProveedor.prdPvdEst === Estado.ACTIVO
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
            onClick={() => action(productoProveedor.prdPvdId!)}
          >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}