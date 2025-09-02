import { create as createZustand } from 'zustand';
import { toast } from 'sonner';
// Importa tu acción para obtener segmentos
// Importa el tipo Segmentos de tu schema
import { Segmentos } from '../schemas/segmento.schema'; 
import { Response } from '@/lib/types/response.type'; // Asegúrate de importar tu tipo Response
import { findAllSegmentos } from '../actions/segmentos.action';

// Define el estado para tu store de Segmentos
interface SegmentoState {
  segmentos: Segmentos[]; // Array para almacenar la lista de segmentos
  isLoading: boolean;     // Para indicar si se están cargando los datos
  error: string | null;   // Para manejar posibles errores
  
  // Función para obtener los segmentos
  fetchSegmentos: () => Promise<void>; 
  // Función para limpiar errores (opcional)
  clearError: () => void;
}

// Crea el store de Zustand para Segmentos
export const useSegmentoStore = createZustand<SegmentoState>((set) => ({
  segmentos: [],
  isLoading: false,
  error: null,

  fetchSegmentos: async () => {
    set({ isLoading: true, error: null });
    try {
      // 👈 Asegúrate de que este tipo coincida con la respuesta REAL de tu API
      const result: Response<Segmentos[] > = await findAllSegmentos();
      
      // *** NUEVO: Mensaje de consola para ver la respuesta completa ***
      console.log('Respuesta COMPLETA de findAllSegmentos:', result);

      if (result.status === 200 && result.payload && Array.isArray(result.payload)) {
        console.log('Segmentos cargados exitosamente:', result.payload);
        set({ 
          segmentos: result.payload, 
          isLoading: false 
        });
      } else {
        // *** NUEVO: Mensaje de consola más detallado si la condición no se cumple ***
        console.error('La API de segmentos no devolvió el formato esperado o hubo un error en el backend.', {
          status: result.status,
          message: result.message,
          payload: result.payload,
          errors: result.errors
        });
        const errorMessage = result.errors?.[0]?.msg || 'Error desconocido al obtener segmentos. Verifica el formato de la respuesta de la API.';
        set({ 
          error: errorMessage, 
          isLoading: false,
          segmentos: []
        });
        toast.error(errorMessage, { richColors: true });
      }
    } catch (err) {
      // *** NUEVO: Mensaje de consola si hay un error de red o de acción ***
      console.error('Excepción capturada durante la petición de segmentos:', err);
      const errorMessage = (err as Error).message || 'Fallo en la conexión o la acción de segmentos.';
      set({ 
        error: errorMessage, 
        isLoading: false,
        segmentos: []
      });
      toast.error(errorMessage, { richColors: true });
    }
  },

  clearError: () => set({ error: null }),
}));
