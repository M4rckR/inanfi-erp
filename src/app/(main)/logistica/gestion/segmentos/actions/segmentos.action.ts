'use server';

import { Response } from '@/lib/types/response.type';
import { fetchApi } from '@/lib/api';
import { Segmentos } from '../schemas/segmento.schema';

export async function findAllSegmentos():Promise<Response<Segmentos[]>> { 
  const res = await fetchApi(`/logistica/segmentos`, {
    method: 'GET',
  });
  const data = await res.json();
  /* console.log('Lista Segmentos :', data); */
  return { ...data };
}