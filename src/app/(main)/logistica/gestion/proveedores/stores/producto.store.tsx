import { create as createZustand } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { toast } from 'sonner';
import { defaultPagination, Pagination } from '@/lib/types/pagination.type';
import { defaultProductoProveedorValues, ProductoProveedor } from '../schemas/producto.schema';
import { defaultFilterProductoProveedorValues, FilterProductoProveedor } from '../schemas/filter-producto.shema';
import { changeStatus, create, findAll, update } from '../actions/producto.action';
import { Proveedor } from '../schemas/proveedor.schema';
import { getOne } from '../actions/proveedor.action';


interface Producto {
  prdId: number;
  prdNom: string;
}

interface Marca {
  marId: number;
  marNom: string;
}

interface ProductoProveedorConRelaciones extends ProductoProveedor {
  pvd?: Proveedor;
  prd?: Producto;
  mar?: Marca;
}


type ProductoProveedorState = {
  pagination: Pagination<ProductoProveedor>;
  filter: FilterProductoProveedor;
  proveedor: Proveedor | null;
  productoProveedor: ProductoProveedor; // El producto en el estado del store ya estará aplanado
  isLoading: boolean;
  openModal: boolean;
  openAlert: boolean;
  
  
  clearFilters: (id?:number) => void;
  getProveedor: (id:number) => void;
  getProductosProveedor: (id : number, pageable: Pick<Pagination<ProductoProveedor>, 'page' | 'size' | 'sort'>, filter: FilterProductoProveedor) => Promise<void>;
  paginationChange: (pageable: Pick<Pagination<Producto>, 'page' | 'size'>) => void;
  filterChange: (filter: FilterProductoProveedor) => void;
  setOpenModal: (open: boolean) => void;
  setOpenAlert: (open: boolean) => void;
  setProductoProveedor: ( productoConRelaciones: ProductoProveedorConRelaciones) => void; // Acepta el tipo con relaciones anidadas
  
  saveProductoProveedor: (id: number, productoProveedor: ProductoProveedor) => Promise<void>;
  changeStatus: (prdId: number) => Promise<void>;

}



export const useProductoProveedor = createZustand<ProductoProveedorState>()(persist((set, get) => ({
  pagination: defaultPagination,
  filter: defaultFilterProductoProveedorValues,
  proveedor: null,
  productoProveedor: defaultProductoProveedorValues,
  isLoading: false,
  openModal: false,
  openAlert: false,


  
  clearFilters: (id?) => {
    
    set({ filter: defaultFilterProductoProveedorValues, pagination: defaultPagination });
    const pvdId = id ? id : get().proveedor!.pvdId;
    get().getProductosProveedor( pvdId! ,defaultPagination, defaultFilterProductoProveedorValues);
  },
  getProveedor: async (id) => {
    const result = await getOne(id);
    console.log(result);
    
    set({proveedor:result.payload as Proveedor})
  },
  getProductosProveedor: async ( id, pageable, filter) => {

    set({ isLoading: true });
    const result = await findAll(id, pageable, filter);
    
    if (result.status !== 200) {
      set({ isLoading: false });
      if (result.errors && result.errors.length > 0)
        toast.error(result.errors![0].msg, {
          richColors: true,
        });
      return;
    }

    //console.log('Payload recibido:', result.payload);

    set({ pagination: result.payload as Pagination<ProductoProveedor>, isLoading: false });
  },
  paginationChange: (pageable) => {
    const { page, size } = pageable;
    const newPagination = {
      ...get().pagination,
      page,
      size,
    };
    set({ pagination: newPagination });
    console.log('Sending filter to backend:', get().filter);
    const {pvdId} = get().proveedor!;
    get().getProductosProveedor(pvdId!, newPagination, get().filter);
  },
  filterChange: (filter) => {
    set({ filter });
    const newPagination = {
      ...get().pagination,
      page: 1,
    };
    set({ pagination: newPagination });
    const {pvdId} = get().proveedor!;
    get().getProductosProveedor(pvdId!, newPagination, get().filter);
  },
  setOpenModal: (open) => {
    set({ openModal: open });
  },
  setOpenAlert: (open) => {
    set({ openAlert: open });
  },

  setProductoProveedor: (productoConRelaciones: ProductoProveedorConRelaciones) => {
    const flattenedProducto: ProductoProveedor = {
      ...productoConRelaciones,
      
      prdId: productoConRelaciones.prd?.prdId ?? 0, 
      marId: productoConRelaciones.mar?.marId ?? 0,
     
    };
    set({ productoProveedor: flattenedProducto });
  },
  saveProductoProveedor: async (id, productoProveedor) => {
    
    //const proId = get().productoProveedor.pvdId as number;
    console.log(id);

        
    /* set({ isLoading: true }); */
    const operacion = productoProveedor.prdPvdId ? 'UPDATE' : 'CREATE';
    const result = operacion === 'CREATE' ? await create(id, productoProveedor ) : await update(id, productoProveedor);
    console.log('Este es el resultado ',result);
    
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
    const {pvdId} = get().proveedor!;
    get().getProductosProveedor(pvdId!,get().pagination, get().filter);
  },
  changeStatus: async (productoProveedorId) => {
    set({ isLoading: true });
    const result = await changeStatus(productoProveedorId);
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
    const {pvdId} = get().proveedor!;
    get().getProductosProveedor(pvdId!, get().pagination, get().filter);
  }
}), {
  name: 'productosProveedor',
  storage: createJSONStorage(() => localStorage),
  partialize: () => ({})
}));
