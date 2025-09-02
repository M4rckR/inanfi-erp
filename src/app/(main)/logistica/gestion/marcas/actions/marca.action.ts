'use server';

import { Pagination } from "@/lib/types/pagination.type";
import { Marca } from "../schemas/marca.schema";
import { FilterMarca } from "../schemas/filter-marca.schema";
import { Response } from "@/lib/types/response.type";
import { fetchApi } from "@/lib/api";


export async function findAll(
    pageable: Pick<Pagination<Marca>, 'page' | 'size' | 'sort'>,
    filter: FilterMarca
): Promise<Response<object>> {
    
    // Armar la URL con los parámetros de paginación
    const params = new URLSearchParams({
        page: String(pageable.page),
        size: String(pageable.size)
    });

    if(filter.marNom){
        params.append('marNom', filter.marNom);
    }
    if(filter.marEst){
        params.append('marEst', filter.marEst);
    }
    if(filter.sort){
        params.append('sort', filter.sort);
    }

    const res = await fetchApi(`/logistica/marca?${params.toString()}`, {
        method: 'GET',
    });
    const data = await res.json();
    return {...data};
}

export async function create(marca: Marca):Promise<Response<object>>{
    const res = await fetchApi('/logistica/marca', {
        method: 'POST',
        body: JSON.stringify(marca)
    });
    const data = await res.json();
    return {...data};
}

export async function update(marca: Marca): Promise<Response<object>> {
    const {marId, ...rest } = marca;
    delete rest.marEst;
    const res = await fetchApi(`/logistica/marca/${marId}`,{
        method: 'PATCH',
        body: JSON.stringify(rest)
    });
    const data = await res.json();
    return {...data };
}

export async function changeStatus(marId:number): Promise<Response<object>> {
    const res = await fetchApi(`/logistica/marca/change-status/${marId}`, {
        method: 'PATCH'
    });
    const data = await res.json();
    return {...data};
}

export async function findAllMarcas() : Promise<Response<Marca[]>> {
  const res = await fetchApi(`/logistica/marca/all`, {
    method: 'GET',
  });
  const data = await res.json(); 
  return { ...data };
}