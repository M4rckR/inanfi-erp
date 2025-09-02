'use server';

import { Pagination } from "@/lib/types/pagination.type";

import { Response } from "@/lib/types/response.type";
import { fetchApi } from "@/lib/api";
import { Proveedor } from "../schemas/proveedor.schema";
import { FilterProveedor } from "../schemas/filter-proveedor.schema";


export async function findAll(
    pageable: Pick<Pagination<Proveedor>, 'page' | 'size' | 'sort'>,
    filter: FilterProveedor
): Promise<Response<object>> {
    
    // Armar la URL con los parámetros de paginación
    const params = new URLSearchParams({
        page: String(pageable.page),
        size: String(pageable.size)
    });

    if(filter.pvdRazSoc){
        params.append('pvdRazSoc', filter.pvdRazSoc);
    }
    if(filter.pvdNumDoc){
        params.append('pvdNumDoc', filter.pvdNumDoc);
    }
    if(filter.pvdEst){
        params.append('pvdEst', filter.pvdEst);
    }
    if(filter.sort){
        params.append('sort', filter.sort);
    }

    const res = await fetchApi(`/logistica/proveedor?${params.toString()}`, {
        method: 'GET',
    });
    const data = await res.json();
    return {...data};
}

export async function getOne(id:number) {
    const res = await fetchApi(`/logistica/proveedor/${id}`, {
        method: 'GET'
    });
    const data = await res.json();
    //console.log(data)
    return {...data};
}

export async function create(proveedor: Proveedor):Promise<Response<object>>{
    const res = await fetchApi('/logistica/proveedor', {
        method: 'POST',
        body: JSON.stringify(proveedor)
    });
    const data = await res.json();
    //console.log(data)
    return {...data};
}

export async function update(proveedor: Proveedor): Promise<Response<object>> {
    const {pvdId, ...rest } = proveedor;
    delete rest.pvdEst;
    const res = await fetchApi(`/logistica/proveedor/${pvdId}`,{
        method: 'PATCH',
        body: JSON.stringify(rest)
    });
    const data = await res.json();
    return {...data };
}

export async function changeStatus(pvdId:number): Promise<Response<object>> {
    const res = await fetchApi(`/logistica/proveedor/change-status/${pvdId}`, {
        method: 'PATCH'
    });
    const data = await res.json();
    return {...data};
}