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
import { CategoriaCreateFormData } from '../schemas/categoria.schema';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoria: CategoriaCreateFormData;
  action: (pstId: number) => void;
}

export default function CategoriasAlert({ open, onOpenChange, categoria, action }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {categoria.catEst === Estado.ACTIVO
              ? `¿Estas seguro de inactivar la categoria "${categoria.catNom}"?`
              : `¿Estas seguro de activar la categoria "${categoria.catNom}"?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {categoria.catEst === Estado.ACTIVO
              ? 'Al inactivar la categoria, no estará disponible para los usuarios.'
              : 'Al activar la categoria, estará disponible para los usuarios.'}
            <br />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-in-danger hover:bg-in-danger/90 text-white hover:text-white">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-in-success hover:bg-in-success/90 text-white hover:text-white"
            onClick={() => action(categoria.catId!)}
          >
            Aceptar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}