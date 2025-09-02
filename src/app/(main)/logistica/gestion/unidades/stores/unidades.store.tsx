import { create as createZustand } from 'zustand';
import { toast } from 'sonner';
// Importa tu acción para obtener unidades
// Importa el tipo Unidades de tu schema
import { Response } from '@/lib/types/response.type'; 
import { Unidades } from '../schemas/unidades.schema';
import { findAllUnidades } from '../actions/unidades.action';

// Define el estado para tu store de Unidades
interface UnidadesState {
  unidades: Unidades[]; // Array para almacenar la lista de unidades
  isLoading: boolean;     // Para indicar si se están cargando los datos
  error: string | null;   // Para manejar posibles errores
  
  // Función para obtener los unidades
  fetchUnidades: () => Promise<void>; 
  // Función para limpiar errores (opcional)
  clearError: () => void;
}

// Crea el store de Zustand para Unidades
export const useUnidadestore = createZustand<UnidadesState>((set) => ({
  unidades: [],
  isLoading: false,
  error: null,

  fetchUnidades: async () => {
    set({ isLoading: true, error: null });
    try {
      // 👈 Asegúrate de que este tipo coincida con la respuesta REAL de tu API
      const result: Response<Unidades[] > = await findAllUnidades();
      
      // *** NUEVO: Mensaje de consola para ver la respuesta completa ***
      console.log('Respuesta COMPLETA de findAllUnidades:', result);

      if (result.status === 200 && result.payload && Array.isArray(result.payload)) {
        console.log('Unidades cargados exitosamente:', result.payload);
        set({ 
          unidades: result.payload, 
          isLoading: false 
        });
      } else {
        // *** NUEVO: Mensaje de consola más detallado si la condición no se cumple ***
        console.error('La API de unidades no devolvió el formato esperado o hubo un error en el backend.', {
          status: result.status,
          message: result.message,
          payload: result.payload,
          errors: result.errors
        });
        const errorMessage = result.errors?.[0]?.msg || 'Error desconocido al obtener unidades. Verifica el formato de la respuesta de la API.';
        set({ 
          error: errorMessage, 
          isLoading: false,
          unidades: []
        });
        toast.error(errorMessage, { richColors: true });
      }
    } catch (err) {
      // *** NUEVO: Mensaje de consola si hay un error de red o de acción ***
      console.error('Excepción capturada durante la petición de unidades:', err);
      const errorMessage = (err as Error).message || 'Fallo en la conexión o la acción de unidades.';
      set({ 
        error: errorMessage, 
        isLoading: false,
        unidades: []
      });
      toast.error(errorMessage, { richColors: true });
    }
  },

  clearError: () => set({ error: null }),
}));
