import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronsUpDown } from 'lucide-react';
import { SidebarMenuButton } from '@/components/ui/sidebar';

export function NavUserSkeleton() {

    return (
      <SidebarMenuButton size="lg">
        <Avatar className="h-8 w-8 rounded-lg">
          {/*<AvatarImage src={user.avatar} alt={user.name} />*/}
          <AvatarFallback className="rounded-lg">
            <Skeleton className="h-10 w-10" />
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left leading-tight">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
        <ChevronsUpDown className="ml-auto size-4" />
      </SidebarMenuButton>
    )
}
