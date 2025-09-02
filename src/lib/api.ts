import 'server-only';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3500/api'; // Tu URL del backend NestJS

export async function fetchApi(endpoint: string, options?: RequestInit) {
  const url = `${API_BASE_URL}${endpoint}`;
  const cookieStore = await cookies();
  const cookie = cookieStore.get('jwt');

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookie ? `${cookie.name}=${cookie.value}` : '',
      ...options?.headers,
    },
  });

  const setCookieHeader = response.headers.get('set-cookie');
  if (setCookieHeader) {
    const cookieValue = setCookieHeader.split(';')[0].split('=')[1];
    cookieStore.set('jwt', cookieValue, {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      maxAge: 1800,
    });
  }

  return response;
}