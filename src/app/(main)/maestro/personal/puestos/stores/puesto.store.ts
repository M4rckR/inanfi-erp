import { create as createZustand } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { defaultPuestoValues, Puesto } from '@/app/(main)/maestro/personal/puestos/schemas/puesto.schema';
import {
  defaultFilterPuestoValues,
  FilterPuesto
} from '@/app/(main)/maestro/personal/puestos/schemas/filter-puesto.schema';
import { defaultPagination, Pagination } from '@/lib/types/pagination.type';
import { changeStatus, create, findAll, update } from '@/app/(main)/maestro/personal/puestos/actions/puesto.action';

type PuestoState = {
  pagination: Pagination<Puesto>;
  filter: FilterPuesto;
  puesto: Puesto;
  isLoading: boolean;
  openModal: boolean;
  openAlert: boolean;

  clearFilters: () => void;
  getPuestos: (pageable: Pick<Pagination<Puesto>, 'page' | 'size' | 'sort'>, filter: FilterPuesto) => Promise<void>;
  paginationChange: (pageable: Pick<Pagination<Puesto>, 'page' | 'size'>) => void;
  filterChange: (filter: FilterPuesto) => void;
  setOpenModal: (open: boolean) => void;
  setOpenAlert: (open: boolean) => void;
  setPuesto: (puesto: Puesto) => void;

  savePuesto: (puesto: Puesto) => Promise<void>;
  changeStatus: (pstId: number) => Promise<void>;
}

export const usePuesto = createZustand<PuestoState>()(persist((set, get) => ({
  pagination: defaultPagination,
  filter: defaultFilterPuestoValues,
  puesto: defaultPuestoValues,
  isLoading: false,
  openModal: false,
  openAlert: false,

  clearFilters: () => {
    set({ filter: defaultFilterPuestoValues, pagination: defaultPagination });
  },

  getPuestos: async (pageable, filter) => {
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
    set({ pagination: result.payload as Pagination<Puesto>, isLoading: false });
  },

  paginationChange: (pageable) => {
    const { page, size } = pageable;
    const newPagination = {
      ...get().pagination,
      page,
      size,
    };
    set({ pagination: newPagination });
    get().getPuestos(newPagination, get().filter);
  },
  filterChange: (filter) => {
    set({ filter });
    const newPagination = {
      ...get().pagination,
      page: 1,
    };
    set({ pagination: newPagination });
    get().getPuestos(newPagination, get().filter);
  },
  setOpenModal: (open) => {
    set({ openModal: open });
  },
  setOpenAlert: (open) => {
    set({ openAlert: open });
  },
  setPuesto: (puesto) => {
    set({ puesto });
  },
  savePuesto: async (puesto) => {
    set({ isLoading: true });
    const operacion = puesto.pstId ? 'UPDATE' : 'CREATE';
    const result = operacion === 'CREATE' ? await create(puesto) : await update(puesto);
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
    get().getPuestos(get().pagination, get().filter);
  },
  changeStatus: async (pstId) => {
    set({ isLoading: true });
    const result = await changeStatus(pstId);
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
    get().getPuestos(get().pagination, get().filter);
  }
}), {
  name: 'puestos',
  storage: createJSONStorage(() => localStorage),
  partialize: () => ({})
}));