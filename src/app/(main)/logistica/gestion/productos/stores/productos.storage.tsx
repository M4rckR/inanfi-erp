import { create as createZustand } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { defaultPagination, Pagination } from '@/lib/types/pagination.type';
import { defaultProductoValues, Producto } from '../schemas/producto.schema';
import { defaultFilterProductoValues, FilterProducto } from '../schemas/filter-producto.schema';
import { changeStatus, create, findAll, findAllProductos, update } from '../actions/producto.action';
import { Response } from '@/lib/types/response.type';


interface Categoria {
  catId: number;
  catNom: string;
}

interface Segmento {
  sgiId: number;
  sgiNom: string;
}

interface Unidad {
  uniId: number;
  uniNom: string;
}


interface ProductoConRelaciones extends Producto {
  cat?: Categoria;
  sgi?: Segmento;
  uni?: Unidad;
}

type ProductoState = {
  pagination: Pagination<Producto>;
  filter: FilterProducto;
  producto: Producto; 
  productos: Producto[];
  isLoading: boolean;
  openModal: boolean;
  openAlert: boolean; 
  error:string | null;

  fetchProductos : () => Promise<void>;
  
  clearFilters: () => void;
  getProductos: (pageable: Pick<Pagination<Producto>, 'page' | 'size' | 'sort'>, filter: FilterProducto) => Promise<void>;
  paginationChange: (pageable: Pick<Pagination<Producto>, 'page' | 'size'>) => void;
  filterChange: (filter: FilterProducto) => void;
  setOpenModal: (open: boolean) => void;
  setOpenAlert: (open: boolean) => void;
  setProducto: (productoConRelaciones: ProductoConRelaciones) => void; // Acepta el tipo con relaciones anidadas
  
  saveProducto: (producto: Producto) => Promise<void>;
  changeStatus: (prdId: number) => Promise<void>;
}

export const useProducto = createZustand<ProductoState>()(persist((set, get) => ({
  pagination: defaultPagination,
  filter: defaultFilterProductoValues,
  producto: defaultProductoValues,
  productos: [],
  isLoading: false,
  openModal: false,
  openAlert: false,
  error: null,

  fetchProductos: async() => {
    set({ isLoading: true, error: null });
    try {
      const result: Response<Producto[]> = await findAllProductos();
      if (result.status === 200 && result.payload && Array.isArray(result.payload)) {
        console.log('Productos cargados exitosamente:', result.payload);
        set({ 
          productos: result.payload, 
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
        const errorMessage = result.errors?.[0]?.msg || 'Error desconocido al obtener Productos. Verifica el formato de la respuesta de la API.';
        set({ 
          error: errorMessage, 
          isLoading: false,
          productos: []
        });
        toast.error(errorMessage, { richColors: true });
      }

    } catch (err) {
        // *** NUEVO: Mensaje de consola si hay un error de red o de acción ***
      console.error('Excepción capturada durante la petición de Categorias:', err);
      const errorMessage = (err as Error).message || 'Fallo en la conexión o la acción de Categorias.';
      set({ 
        error: errorMessage, 
        isLoading: false,
        productos: []
      });
      toast.error(errorMessage, { richColors: true });
    }
  },
  clearFilters: () => {
    set({ filter: defaultFilterProductoValues, pagination: defaultPagination });
    get().getProductos(defaultPagination, defaultFilterProductoValues);
  },
  getProductos: async (pageable, filter) => {
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
    set({ pagination: result.payload as Pagination<Producto>, isLoading: false });
  },
  paginationChange: (pageable) => {
    const { page, size } = pageable;
    const newPagination = {
      ...get().pagination,
      page,
      size,
    };
    set({ pagination: newPagination });
    //console.log('Sending filter to backend:', get().filter);
    get().getProductos(newPagination, get().filter);
  },
  filterChange: (filter) => {
    set({ filter });
    const newPagination = {
      ...get().pagination,
      page: 1,
    };
    set({ pagination: newPagination });
    get().getProductos(newPagination, get().filter);
  },
  setOpenModal: (open) => {
    set({ openModal: open });
  },
  setOpenAlert: (open) => {
    set({ openAlert: open });
  },

  setProducto: (productoConRelaciones: ProductoConRelaciones) => {
    const flattenedProducto: Producto = {
      ...productoConRelaciones,
      catId: productoConRelaciones.cat?.catId ?? 0, 
      sgiId: productoConRelaciones.sgi?.sgiId ?? 0,
      uniId: productoConRelaciones.uni?.uniId ?? 0,
     
    };
    set({ producto: flattenedProducto });
  },
  saveProducto: async (producto) => {
    console.log("Producto a guardar (flattened):", producto);
    
    /* set({ isLoading: true }); */
    const operacion = producto.prdId ? 'UPDATE' : 'CREATE';
    const result = operacion === 'CREATE' ? await create(producto) : await update(producto);
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
    get().getProductos(get().pagination, get().filter);
  },
  changeStatus: async (prdId) => {
    set({ isLoading: true });
    const result = await changeStatus(prdId);
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
    get().getProductos(get().pagination, get().filter);
  }
}), {
  name: 'productos',
  storage: createJSONStorage(() => localStorage),
  partialize: () => ({})
}));
