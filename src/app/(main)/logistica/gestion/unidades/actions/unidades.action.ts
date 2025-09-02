'use server';

import { Response } from '@/lib/types/response.type';
import { fetchApi } from '@/lib/api';
import { Unidades } from '../schemas/unidades.schema';

export async function findAllUnidades():Promise<Response<Unidades[]>> { 
  const res = await fetchApi(`/logistica/unidades`, {
    method: 'GET',
  });
  const data = await res.json();
  //console.log('Lista Unidades :', data);
  return { ...data };
}