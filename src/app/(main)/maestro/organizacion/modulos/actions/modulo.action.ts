'use server';

import { Response } from '@/lib/types/response.type';
import { fetchApi } from '@/lib/api';
import { Pagination } from '@/lib/types/pagination.type';
import { FilterModulo } from '@/app/(main)/maestro/organizacion/modulos/schemas/filter-modulo.schema';
import { Modulo } from '@/app/(main)/maestro/organizacion/modulos/schemas/modulo.schema';

export async function findAll(
  pageable: Pick<Pagination<Modulo>, 'page' | 'size' | 'sort'>,
  filter: FilterModulo
): Promise<Response<object>> {
  // Armar la URL con los parámetros de paginación
  const params = new URLSearchParams({
    page: String(pageable.page),
    size: String(pageable.size),
    // sort: pageable.sort || 'asc',
  });
  if (filter.modNom) {
    params.append('modNom', filter.modNom);
  }
  if (filter.modEst) {
    params.append('modEst', filter.modEst);
  }
  if (filter.sort) {
    params.append('sort', filter.sort);
  }

  const res = await fetchApi(`/modulos?${params.toString()}`, {
    method: 'GET',
  });
  const data = await res.json();
  return { ...data };
}

export async function create(modulo: Modulo): Promise<Response<object>> {
  const res = await fetchApi('/modulos', {
    method: 'POST',
    body: JSON.stringify(modulo),
  });
  const data = await res.json();
  return { ...data };
}

export async function update(modulo: Modulo): Promise<Response<object>> {
  const { modId, ...rest } = modulo;
  delete rest.modEst;
  const res = await fetchApi(`/modulos/${modId}`, {
    method: 'PATCH',
    body: JSON.stringify(rest),
  });
  const data = await res.json();
  return { ...data };
}

export async function changeStatus(modId: number): Promise<Response<object>> {
  const res = await fetchApi(`/modulos/change-status/${modId}`, {
    method: 'PATCH',
  });
  const data = await res.json();
  return { ...data };
}