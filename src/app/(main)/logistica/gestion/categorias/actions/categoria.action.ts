'use server';

import { Response } from '@/lib/types/response.type';
import { fetchApi } from '@/lib/api';
import { Pagination } from '@/lib/types/pagination.type';
import { FilterCategoria } from '../schemas/filter-categoria.schema';
import { CategoriaCreateFormData } from '../schemas/categoria.schema';

export async function findAll(
  pageable: Pick<Pagination<CategoriaCreateFormData>, 'page' | 'size' | 'sort'>,
  filter: FilterCategoria
): Promise<Response<object>> {
  // Armar la URL con los parámetros de paginación
  const params = new URLSearchParams({
    page: String(pageable.page),
    size: String(pageable.size),
    // sort: pageable.sort || 'asc',
  });

  if (filter.catNom) {
    params.append('catNom', filter.catNom);
  }
  if (filter.catEst) {
    params.append('catEst', filter.catEst);
  } 
  if (filter.sort) {
    params.append('sort', filter.sort);
  }
  console.log('Paginación', params.toString());
  
  const res = await fetchApi(`/logistica/categoria?${params.toString()}`, {
    method: 'GET',
  });
  const data = await res.json();
  console.log(data)
  return { ...data };
}

export async function create(categoria: CategoriaCreateFormData): Promise<Response<object>> {
  const res = await fetchApi('/logistica/categoria', {
    method: 'POST',
    body: JSON.stringify(categoria),
  });
  const data = await res.json();
  return { ...data };
}

export async function update(categoria: CategoriaCreateFormData): Promise<Response<object>> {
  const { catId, ...rest } = categoria;
  delete rest.catEst;
  const res = await fetchApi(`/logistica/categoria/${catId}`, {
    method: 'PATCH',
    body: JSON.stringify(rest),
  });
  const data = await res.json();
  return { ...data };
}

export async function changeStatus(catId: number): Promise<Response<object>> {
  const res = await fetchApi(`/logistica/categoria/change-status/${catId}`, {
    method: 'PATCH',
  });
  const data = await res.json();
  return { ...data };
}

export async function findAllCategorias() : Promise<Response<CategoriaCreateFormData[]>> {
  const res = await fetchApi(`/logistica/categoria/all`, {
    method: 'GET',
  });
  const data = await res.json();
  console.log('Lista Categorias :', data); 
  return { ...data };
}