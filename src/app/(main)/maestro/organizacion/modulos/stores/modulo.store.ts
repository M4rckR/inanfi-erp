import { create as createZustand } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { changeStatus, create, findAll, update } from '@/app/(main)/maestro/organizacion/modulos/actions/modulo.action';
import { toast } from 'sonner';
import { defaultPagination, Pagination } from '@/lib/types/pagination.type';
import {
  defaultFilterModuloValues,
  FilterModulo
} from '@/app/(main)/maestro/organizacion/modulos/schemas/filter-modulo.schema';
import { defaultModuloValues, Modulo } from '@/app/(main)/maestro/organizacion/modulos/schemas/modulo.schema';

type ModuloState = {
  pagination: Pagination<Modulo>;
  filter: FilterModulo;
  modulo: Modulo;
  isLoading: boolean;
  openModal: boolean;
  openAlert: boolean;

  clearFilters: () => void;
  getModulos: (pageable: Pick<Pagination<Modulo>, 'page' | 'size' | 'sort'>, filter: FilterModulo) => Promise<void>;
  paginationChange: (pageable: Pick<Pagination<Modulo>, 'page' | 'size'>) => void;
  filterChange: (filter: FilterModulo) => void;
  setOpenModal: (open: boolean) => void;
  setOpenAlert: (open: boolean) => void;
  setModulo: (modulo: Modulo) => void;

  saveModulo: (modulo: Modulo) => Promise<void>;
  changeStatus: (modId: number) => Promise<void>;
}

export const useModulo = createZustand<ModuloState>()(persist((set, get) => ({
  pagination: defaultPagination,
  filter: defaultFilterModuloValues,
  modulo: defaultModuloValues,
  isLoading: false,
  openModal: false,
  openAlert: false,

  clearFilters: () => {
    set({ filter: defaultFilterModuloValues, pagination: defaultPagination });
  },

  getModulos: async (pageable, filter) => {
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
    set({ pagination: result.payload as Pagination<Modulo>, isLoading: false });
  },

  paginationChange: (pageable) => {
    const { page, size } = pageable;
    const newPagination = {
      ...get().pagination,
      page,
      size,
    };
    set({ pagination: newPagination });
    get().getModulos(newPagination, get().filter);
  },
  filterChange: (filter) => {
    set({ filter });
    const newPagination = {
      ...get().pagination,
      page: 1,
    };
    set({ pagination: newPagination });
    get().getModulos(newPagination, get().filter);
  },
  setOpenModal: (open) => {
    set({ openModal: open });
  },
  setOpenAlert: (open) => {
    set({ openAlert: open });
  },
  setModulo: (modulo) => {
    set({ modulo });
  },
  saveModulo: async (modulo) => {
    set({ isLoading: true });
    const operacion = modulo.modId ? 'UPDATE' : 'CREATE';
    const result = operacion === 'CREATE' ? await create(modulo) : await update(modulo);
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
    get().getModulos(get().pagination, get().filter);
  },
  changeStatus: async (modId) => {
    set({ isLoading: true });
    const result = await changeStatus(modId);
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
    get().getModulos(get().pagination, get().filter);
  },

}), {
  name: 'modulos',
  storage: createJSONStorage(() => localStorage),
  partialize: () => ({})
}));