'use client';

import { Bell, ChevronsUpDown, CircleUser, LogOut, Moon, Sun, } from 'lucide-react';
import { Avatar, AvatarFallback, } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, } from '@/components/ui/sidebar';
import { useTheme } from 'next-themes';
import { useAuth } from '@/lib/stores/auth.store';
import { useEffect } from 'react';
import { NavUserSkeleton } from '@/app/ui/skeletons/sidebar/nav-user-skeleton';

export function NavUser() {
  const { navUser, mapperNavUser, logout } = useAuth();
  const { setTheme, theme } = useTheme();
  const { isMobile } = useSidebar();

  useEffect(() => {
    mapperNavUser();
  }, [mapperNavUser]);

  if (!navUser) {
    return <NavUserSkeleton />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                {/*<AvatarImage src={user.avatar} alt={user.name} />*/}
                <AvatarFallback className="rounded-lg bg-gray-800 text-white">{navUser.abbr}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{navUser.name}</span>
                <span className="truncate text-xs">{navUser.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  {/*<AvatarImage src={user.avatar} alt={user.name} />*/}
                  <AvatarFallback className="rounded-lg bg-gray-800 text-white">{navUser.abbr}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{navUser.name}</span>
                  <span className="truncate text-xs">{navUser.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CircleUser />
                Perfil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notificaciones
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                {theme === 'dark' ? <Sun /> : <Moon />}
                Tema
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
