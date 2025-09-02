'use server';

import { Response } from '@/lib/types/response.type';
import { fetchApi } from '@/lib/api';
import { Pagination } from '@/lib/types/pagination.type';
import { Puesto } from '@/app/(main)/maestro/personal/puestos/schemas/puesto.schema';
import { FilterPuesto } from '@/app/(main)/maestro/personal/puestos/schemas/filter-puesto.schema';

export async function findAll(
  pageable: Pick<Pagination<Puesto>, 'page' | 'size' | 'sort'>,
  filter: FilterPuesto
): Promise<Response<object>> {
  // Armar la URL con los parámetros de paginación
  const params = new URLSearchParams({
    page: String(pageable.page),
    size: String(pageable.size),
    // sort: pageable.sort || 'asc',
  });
  if (filter.pstNom) {
    params.append('pstNom', filter.pstNom);
  }
  if (filter.pstEst) {
    params.append('pstEst', filter.pstEst);
  }
  if (filter.sort) {
    params.append('sort', filter.sort);
  }

  const res = await fetchApi(`/puestos?${params.toString()}`, {
    method: 'GET',
  });
  const data = await res.json();
  return { ...data };
}

export async function create(puesto: Puesto): Promise<Response<object>> {
  const res = await fetchApi('/puestos', {
    method: 'POST',
    body: JSON.stringify(puesto),
  });
  const data = await res.json();
  return { ...data };
}

export async function update(puesto: Puesto): Promise<Response<object>> {
  const { pstId, ...rest } = puesto;
  delete rest.pstEst;
  const res = await fetchApi(`/puestos/${pstId}`, {
    method: 'PATCH',
    body: JSON.stringify(rest),
  });
  const data = await res.json();
  return { ...data };
}

export async function changeStatus(pstId: number): Promise<Response<object>> {
  const res = await fetchApi(`/puestos/change-status/${pstId}`, {
    method: 'PATCH',
  });
  const data = await res.json();
  return { ...data };
}