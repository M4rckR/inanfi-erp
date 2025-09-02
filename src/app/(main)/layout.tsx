import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/app/ui/sidebar/app-sidebar';
import { HeaderSidebar } from '@/app/ui/sidebar/header-sidebar';

export default async function ErpLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  const cookieStore = await cookies();

  const token = cookieStore.get('jwt')?.value;
  if (!token) {
    redirect('/login');
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <HeaderSidebar />
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}