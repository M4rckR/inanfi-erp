'use client';

import { ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar, } from '@/components/ui/sidebar';
import { redirect } from 'next/navigation';
import { useAuth } from '@/lib/stores/auth.store';
import { navigation } from '@/lib/navs';
import { NavModule } from '@/lib/types/auth.type';
import { useEffect } from 'react';
import { ModuleSwitcherSkeleton } from '@/app/ui/skeletons/sidebar/module-switcher-skeleton';

export function ModuleSwitcher() {
  const { user, navModule, getNavModule, changeModule } = useAuth();
  const { isMobile } = useSidebar();
  const userModulos = user?.modulos.map(m => m.modId);

  const listModulos = navigation.modules.filter(m => userModulos?.includes(m.id));

  useEffect(() => {
    getNavModule();
  }, [getNavModule]);

  const handleModuleChange = (module: NavModule) => {
    changeModule(module);
    redirect(module.url);
  };

  if (!navModule) {
    return <ModuleSwitcherSkeleton />;
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
              <div
                className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <navModule.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {navModule.name}
                </span>
                <span className="truncate text-xs">InSalud</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Módulos
            </DropdownMenuLabel>
            {listModulos.map((module, index) => (
              <DropdownMenuItem
                key={index}
                onClick={() => handleModuleChange(module)}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <module.logo className="size-4 shrink-0" />
                </div>
                {module.name}
                <DropdownMenuShortcut>⌘</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}