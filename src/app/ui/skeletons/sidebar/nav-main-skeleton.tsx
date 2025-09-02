import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Skeleton } from '@/components/ui/skeleton';

export function NavMainSkeleton() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <Skeleton className="h-4 w-8" />
      </SidebarGroupLabel>
      <SidebarMenu>
        {Array.from({ length: 1 }).map((_, i) => (
          <SidebarMenuItem key={i}>
            <SidebarMenuButton>
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <Collapsible key={i} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {Array.from({ length: 2 }).map((_, j) => (
                    <SidebarMenuSubItem key={j}>
                      <SidebarMenuSubButton>
                        <Skeleton className="h-4 w-20" />
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
        {Array.from({ length: 2 }).map((_, i) => (
          <SidebarMenuItem key={i}>
            <SidebarMenuButton>
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-24" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}