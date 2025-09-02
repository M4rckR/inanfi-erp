'use client';

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, } from '@/components/ui/sidebar';
import { NavUser } from '@/app/ui/sidebar/nav-user';
import { ModuleSwitcher } from '@/app/ui/sidebar/module-switcher';
import { ComponentProps } from 'react';
import { NavMain } from '@/app/ui/sidebar/nav-main';

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ModuleSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}