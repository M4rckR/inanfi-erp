import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { getModuloPath, Modulo } from '@/lib/enums/modulo.enum';

export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('jwt')?.value;

  if (token) {
    const jwt = jwtDecode(token);
    redirect(getModuloPath((jwt as { module: Modulo }).module));
  }

  return (
    <>{children}</>
  );
}