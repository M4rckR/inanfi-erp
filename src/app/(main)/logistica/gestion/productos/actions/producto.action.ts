'use server';

import { Response } from '@/lib/types/response.type';
import { fetchApi } from '@/lib/api';
import { Pagination } from '@/lib/types/pagination.type';
// Importa los tipos corregidos del esquema de filtro
import { FilterProducto } from '../schemas/filter-producto.schema';
import { Producto } from '../schemas/producto.schema';

export async function findAll(
  pageable: Pick<Pagination<Producto>, 'page' | 'size' | 'sort'>,
  filter: FilterProducto
): Promise<Response<object>> {
  const params = new URLSearchParams({
    page: String(pageable.page),
    size: String(pageable.size),
  });

  // Iterar sobre las propiedades del filtro para agregar dinámicamente
  for (const [key, value] of Object.entries(filter)) {
    // Asegúrate de que el valor no sea nulo o vacío
    if (value) {
      params.append(key, String(value));
    }
  }

  //console.log('Paginación', params.toString());
  
  const res = await fetchApi(`/logistica/productos?${params.toString()}`, {
    method: 'GET',
  });
  const data = await res.json();
  console.log(data);
  return { ...data };
}

export async function create(producto: Producto): Promise<Response<object>> {
  const res = await fetchApi('/logistica/productos', {
    method: 'POST',
    body: JSON.stringify(producto),
  });
  const data = await res.json();
  return { ...data };
}

export async function update(producto: Producto): Promise<Response<object>> {
  // Asegúrate de que el DTO del frontend no envíe el prdId
  const { prdId, ...rest } = producto;
  // Si prdEst es opcional en el DTO, no es necesario eliminarlo
  // delete rest.prdEst; 
  const res = await fetchApi(`/logistica/productos/${prdId}`, {
    method: 'PATCH',
    body: JSON.stringify(rest),
  });
  const data = await res.json();
  return { ...data };
}

export async function changeStatus(prdId: number): Promise<Response<object>> {
  const res = await fetchApi(`/logistica/productos/change-status/${prdId}`, {
    method: 'PATCH',
  });
  const data = await res.json();
  return { ...data };
}


export async function findAllProductos() : Promise<Response<Producto[]>> {
  const res = await fetchApi(`/logistica/productos/all`, {
    method: 'GET',
  });
  const data = await res.json(); 
  return { ...data };
}


