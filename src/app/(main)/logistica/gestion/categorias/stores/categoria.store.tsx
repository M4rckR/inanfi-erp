import { create as createZustand } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { defaultPagination, Pagination } from '@/lib/types/pagination.type';
import { defaultFilterCategoriaValues, FilterCategoria } from '../schemas/filter-categoria.schema';
import { changeStatus, create, findAll, findAllCategorias, update } from '../actions/categoria.action';
import { CategoriaCreateFormData, defaultCategoriaValues } from '../schemas/categoria.schema';
import { Response } from '@/lib/types/response.type';

type CategoriaState = {
  pagination: Pagination<CategoriaCreateFormData>;
  filter: FilterCategoria;
  categoria: CategoriaCreateFormData;
  categorias: CategoriaCreateFormData[],
  isLoading: boolean;
  openModal: boolean;
  openAlert: boolean;
  error: string | null;

  fetchCategorias : () => Promise<void>;
  
  clearFilters: () => void;
  getCategorias: (pageable: Pick<Pagination<CategoriaCreateFormData>, 'page' | 'size' | 'sort'>, filter: FilterCategoria) => Promise<void>;
  paginationChange: (pageable: Pick<Pagination<CategoriaCreateFormData>, 'page' | 'size'>) => void;
  filterChange: (filter: FilterCategoria) => void;
  setOpenModal: (open: boolean) => void;
  setOpenAlert: (open: boolean) => void;
  setCategoria: (categoria: CategoriaCreateFormData) => void;
  
  saveCategoria: (categoria: CategoriaCreateFormData) => Promise<void>;
  changeStatus: (catId: number) => Promise<void>;
}

export const storeCategoria = createZustand<CategoriaState>()(persist((set, get) => ({
  categorias: [],
  pagination: defaultPagination,
  filter: defaultFilterCategoriaValues,
  categoria: defaultCategoriaValues,
  isLoading: false,
  openModal: false,
  openAlert: false,
  error: null,

  fetchCategorias: async () => {
    set({ isLoading: true, error: null });

    try{

      const result: Response<CategoriaCreateFormData[]> = await findAllCategorias();
      if (result.status === 200 && result.payload && Array.isArray(result.payload)) {
        console.log('Categorias cargados exitosamente:', result.payload);
        set({ 
          categorias: result.payload, 
          isLoading: false 
        });
      } else {
        // *** NUEVO: Mensaje de consola más detallado si la condición no se cumple ***
        console.error('La API de Categorias no devolvió el formato esperado o hubo un error en el backend.', {
          status: result.status,
          message: result.message,
          payload: result.payload,
          errors: result.errors
        });
        const errorMessage = result.errors?.[0]?.msg || 'Error desconocido al obtener Categorias. Verifica el formato de la respuesta de la API.';
        set({ 
          error: errorMessage, 
          isLoading: false,
          categorias: []
        });
        toast.error(errorMessage, { richColors: true });
      }

    }catch(err){
      // *** NUEVO: Mensaje de consola si hay un error de red o de acción ***
      console.error('Excepción capturada durante la petición de Categorias:', err);
      const errorMessage = (err as Error).message || 'Fallo en la conexión o la acción de Categorias.';
      set({ 
        error: errorMessage, 
        isLoading: false,
        categorias: []
      });
      toast.error(errorMessage, { richColors: true });
    }
  },
  clearFilters: () => {
    set({ filter: defaultFilterCategoriaValues, pagination: defaultPagination });
    get().getCategorias(defaultPagination, defaultFilterCategoriaValues);
  },

  getCategorias: async (pageable, filter) => {
    set({ isLoading: true });
    const result = await findAll(pageable, filter);
    
    if (result.status !== 200) {
      set({ isLoading: false });
      if (result.errors && result.errors.length > 0)
        toast.error(result.errors![0].msg, {
          richColors: true,
        });
      return;
    }
    set({ pagination: result.payload as Pagination<CategoriaCreateFormData>, isLoading: false });
  },

  paginationChange: (pageable) => {
    const { page, size } = pageable;
    const newPagination = {
      ...get().pagination,
      page,
      size,
    };
    set({ pagination: newPagination });
    get().getCategorias(newPagination, get().filter);
  },
  filterChange: (filter) => {
    set({ filter });
    const newPagination = {
      ...get().pagination,
      page: 1,
    };
    set({ pagination: newPagination });
    get().getCategorias(newPagination, get().filter);
  },
  setOpenModal: (open) => {
    set({ openModal: open });
  },
  setOpenAlert: (open) => {
    set({ openAlert: open });
  },
  setCategoria: (categoria) => {
    set({ categoria });
  },
  saveCategoria: async (categoria) => {
    console.log(categoria);
    
   /*  set({ isLoading: true }); */
    const operacion = categoria.catId ? 'UPDATE' : 'CREATE';
    const result = operacion === 'CREATE' ? await create(categoria) : await update(categoria);
    console.log(result);
    
    if (![200, 201].includes(result.status)) {
      set({ isLoading: false });
      toast.error(result.errors![0].msg, {
        richColors: true,
      });
      return;
    }
    set({ isLoading: false, openModal: false });
    toast.success(result.payload.toString(), {
      richColors: true,
    });
    get().getCategorias(get().pagination, get().filter);
  },
  changeStatus: async (catId) => {
    set({ isLoading: true });
    const result = await changeStatus(catId);
    if (result.status !== 200) {
      set({ isLoading: false });
      toast.error(result.errors![0].msg, {
        richColors: true,
      });
      return;
    }
    set({ isLoading: false, openAlert: false });
    toast.success(result.payload.toString(), {
      richColors: true,
    });
    get().getCategorias(get().pagination, get().filter);
  }
}), {
  name: 'categorias',
  storage: createJSONStorage(() => localStorage),
  partialize: () => ({})
}));