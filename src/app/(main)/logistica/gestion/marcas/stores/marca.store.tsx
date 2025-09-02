import { create as createZustand } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { defaultPagination, Pagination } from '@/lib/types/pagination.type';
import { defaultMarcaValues, Marca } from '../schemas/marca.schema';
import { defaultFilterMarcaValues, FilterMarca } from '../schemas/filter-marca.schema';
import { changeStatus, create, findAll, findAllMarcas, update } from '../actions/marca.action';
import { Response } from '@/lib/types/response.type';

type MarcaState = {
  pagination: Pagination<Marca>;
  filter: FilterMarca;
  marca: Marca;
  marcas: Marca[];
  isLoading: boolean;
  openModal: boolean;
  openAlert: boolean;
  error: string | null;

  fetchMarcas : () => Promise<void>;

  clearFilters: () => void;
  getMarcas: (pageable: Pick<Pagination<Marca>, 'page' | 'size' | 'sort'>, filter: FilterMarca) => Promise<void>;
  paginationChange: (pageable: Pick<Pagination<Marca>, 'page' | 'size'>) => void;
  filterChange: (filter: FilterMarca) => void;
  setOpenModal: (open: boolean) => void;
  setOpenAlert: (open: boolean) => void;
  setMarca: (marca: Marca) => void;
  
  saveMarca: (marca: Marca) => Promise<void>;
  changeStatus: (marId: number) => Promise<void>;
}

export const useMarca = createZustand<MarcaState>()(persist((set, get) => ({
  pagination: defaultPagination,
  filter: defaultFilterMarcaValues,
  marca: defaultMarcaValues,
  marcas: [],
  isLoading: false,
  openModal: false,
  openAlert: false,
  error: null,


  fetchMarcas: async() => {
    set({ isLoading: true, error: null });

    try {
      const result: Response<Marca[]> = await findAllMarcas();
      if (result.status === 200 && result.payload && Array.isArray(result.payload)) {
        //console.log('Marcas cargados exitosamente:', result.payload);
        set({ 
          marcas: result.payload, 
          isLoading: false 
        });
      }else{
        // *** NUEVO: Mensaje de consola más detallado si la condición no se cumple ***
        console.error('La API de Productos no devolvió el formato esperado o hubo un error en el backend.', {
          status: result.status,
          message: result.message,
          payload: result.payload,
          errors: result.errors
        });
        const errorMessage = result.errors?.[0]?.msg || 'Error desconocido al obtener Marcas. Verifica el formato de la respuesta de la API.';
        set({ 
          error: errorMessage, 
          isLoading: false,
          marcas: []
        });
        toast.error(errorMessage, { richColors: true });
      }
      
    } catch (err) {
      console.log(err);
      
    } 
  },
  clearFilters: () => {
    set({ filter: defaultFilterMarcaValues, pagination: defaultPagination });
    get().getMarcas(defaultPagination, defaultFilterMarcaValues);
  },

  getMarcas: async (pageable, filter) => {
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
    set({ pagination: result.payload as Pagination<Marca>, isLoading: false });
  },

  paginationChange: (pageable) => {
    const { page, size } = pageable;
    const newPagination = {
      ...get().pagination,
      page,
      size,
    };
    set({ pagination: newPagination });
    get().getMarcas(newPagination, get().filter);
  },
  filterChange: (filter) => {
    set({ filter });
    const newPagination = {
      ...get().pagination,
      page: 1,
    };
    set({ pagination: newPagination });
    get().getMarcas(newPagination, get().filter);
  },
  setOpenModal: (open) => {
    set({ openModal: open });
  },
  setOpenAlert: (open) => {
    set({ openAlert: open });
  },
  setMarca: (marca) => {
    set({ marca });
  },
  saveMarca: async (marca) => {
    console.log(marca);
    
    /* set({ isLoading: true }); */
    const operacion = marca.marId ? 'UPDATE' : 'CREATE';
    const result = operacion === 'CREATE' ? await create(marca) : await update(marca);
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
    get().getMarcas(get().pagination, get().filter);
  },
  changeStatus: async (marId) => {
    set({ isLoading: true });
    const result = await changeStatus(marId);
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
    get().getMarcas(get().pagination, get().filter);
  }
}), {
  name: 'marcas',
  storage: createJSONStorage(() => localStorage),
  partialize: () => ({})
}));