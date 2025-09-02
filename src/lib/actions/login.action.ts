'use server';

import { Credentials, Usuario } from '@/lib/types/auth.type';
import { fetchApi } from '@/lib/api';
import { Response } from '@/lib/types/response.type';
import { cookies } from 'next/headers';

export async function login(credentials: Credentials): Promise<Response<object>> {
  const res = await fetchApi('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  const data = await res.json();

  if (data.status === 200) {
    const cookieStore = await cookies();

    const usuario = data.payload;
    const modulo = usuario.modulos.find((m: { modPri: boolean }) => m.modPri);

    cookieStore.set('modulo', modulo.modNom, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    });
  }

  return { ...data };
}

export async function verify(): Promise<Response<object>> {
  const res = await fetchApi('/auth/verify', {
    method: 'POST',
  });
  const data = await res.json();

  if (data.status === 200) {
    const cookieStore = await cookies();

    const usuario = data.payload as Usuario;
    const modulo = usuario.modulos.find((m: { modPri: boolean }) => m.modPri);
    cookieStore.set('modulo', modulo!.modNom, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    });
  }

  return { ...data };
}

export async function logout(): Promise<Response<object>> {
  const res = await fetchApi('/auth/logout', {
    method: 'POST',
  });
  const data = await res.json();
  const cookieStore = await cookies();

  cookieStore.getAll().forEach((cookie) => {
    cookieStore.delete(cookie.name);
  });

  return { ...data };
}