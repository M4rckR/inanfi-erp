'use server';

import { Pagination } from "@/lib/types/pagination.type";

import { Response } from "@/lib/types/response.type";
import { fetchApi } from "@/lib/api";
import { ProductoProveedor } from "../schemas/producto.schema";
import { FilterProductoProveedor } from "../schemas/filter-producto.shema";




export async function findAll(
    pvdId: number,
    pageable: Pick<Pagination<ProductoProveedor>, 'page' | 'size' | 'sort'>,
    filter: FilterProductoProveedor
): Promise<Response<object>> {
    
    // Armar la URL con los parámetros de paginación
    const params = new URLSearchParams({
        page: String(pageable.page),
        size: String(pageable.size)
    });

    

    if(filter.prdPvdSku){
        params.append('prdPvdSku', filter.prdPvdSku);
    }
    if(filter.marNom){
        params.append('marNom', filter.marNom);
    }
    if(filter.prdPvdEst){
        params.append('prdPvdEst', filter.prdPvdEst);
    }
    if(filter.sort){
        params.append('sort', filter.sort);
    }
    
    const res = await fetchApi( `/logistica/productos-proveedor/${pvdId}/productos?${params.toString()}`, {
        method: 'GET',
    });
    const data = await res.json();
    //console.log('Esto es la data', data);
    return {...data };
}

export async function create( pvdId:number, productoProveedor: ProductoProveedor):Promise<Response<object>>{
 
    const res = await fetchApi(`/logistica/productos-proveedor/${pvdId}/productos`, { 
        method: 'POST',
        body: JSON.stringify(productoProveedor)
    });
    const data = await res.json();
    console.log(data)
    return {...data};
}

export async function update(id:number, prdPvd:ProductoProveedor): Promise<Response<object>> {
    console.log('id del porveedor', id);
    
    const {prdPvdId = id, ...rest } = prdPvd;
    delete rest.prdPvdEst;
    delete rest.prdPvdEst;
    const res = await fetchApi(`/logistica/productos-proveedor/${prdPvdId}`,{
        method: 'PATCH',
        body: JSON.stringify(rest)
    });
    const data = await res.json();
    console.log('actualizadno la data: ', data);
    
    return {...data };
}

export async function changeStatus(prdPvdEst:number): Promise<Response<object>> {
    const res = await fetchApi(`/logistica/productos-proveedor/change-status/${prdPvdEst}`, {
        method: 'PATCH'
    });
    const data = await res.json();
    return {...data};
}