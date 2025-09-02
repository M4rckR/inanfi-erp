import { create as createZustand } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { defaultPagination, Pagination } from '@/lib/types/pagination.type';
import { defaultProveedoresValues, Proveedor } from '../schemas/proveedor.schema';
import { defaultFilterProveedorValues, FilterProveedor } from '../schemas/filter-proveedor.schema';
import { changeStatus, create, findAll, update } from '../actions/proveedor.action';

type ProveedorState = {
  pagination: Pagination<Proveedor>;
  filter: FilterProveedor;
  proveedor: Proveedor;
  isLoading: boolean;
  openModal: boolean;
  openAlert: boolean;

  clearFilters: () => void;
  getProveedores: (pageable: Pick<Pagination<Proveedor>, 'page' | 'size' | 'sort'>, filter: FilterProveedor) => Promise<void>;
  paginationChange: (pageable: Pick<Pagination<Proveedor>, 'page' | 'size'>) => void;
  filterChange: (filter: FilterProveedor) => void;
  setOpenModal: (open: boolean) => void;
  setOpenAlert: (open: boolean) => void;
  setProveedor: (proveedor: Proveedor) => void;
  
  saveProveedor: (proveedor: Proveedor) => Promise<void>;
  changeStatus: (pvdId: number) => Promise<void>;
}

export const useProveedor = createZustand<ProveedorState>()(persist((set, get) => ({
  pagination: defaultPagination,
  filter: defaultFilterProveedorValues,
  proveedor: defaultProveedoresValues,
  isLoading: false,
  openModal: false,
  openAlert: false,

  clearFilters: () => {
    set({ filter: defaultFilterProveedorValues, pagination: defaultPagination });
    get().getProveedores(defaultPagination, defaultFilterProveedorValues);
  },

  getProveedores: async (pageable, filter) => {
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
    set({ pagination: result.payload as Pagination<Proveedor>, isLoading: false });
  },

  paginationChange: (pageable) => {
    const { page, size } = pageable;
    const newPagination = {
      ...get().pagination,
      page,
      size,
    };
    set({ pagination: newPagination });
    get().getProveedores(newPagination, get().filter);
  },
  filterChange: (filter) => {
    set({ filter });
    const newPagination = {
      ...get().pagination,
      page: 1,
    };
    set({ pagination: newPagination });
    get().getProveedores(newPagination, get().filter);
  },
  setOpenModal: (open) => {
    set({ openModal: open });
  },
  setOpenAlert: (open) => {
    set({ openAlert: open });
  },
  setProveedor: (proveedor) => {
    set({ proveedor });
  },
  saveProveedor: async (proveedor) => {
    console.log(proveedor);
    
   /*  set({ isLoading: true }); */
    const operacion = proveedor.pvdId ? 'UPDATE' : 'CREATE';
    const result = operacion === 'CREATE' ? await create(proveedor) : await update(proveedor);
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
    get().getProveedores(get().pagination, get().filter);
  },
  changeStatus: async (pvdId) => {
    set({ isLoading: true });
    const result = await changeStatus(pvdId);
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
    get().getProveedores(get().pagination, get().filter);
  }
}), {
  name: 'proveedores',
  storage: createJSONStorage(() => localStorage),
  partialize: () => ({})
}));