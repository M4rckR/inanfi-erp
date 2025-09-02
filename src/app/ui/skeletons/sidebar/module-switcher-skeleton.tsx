import { Skeleton } from '@/components/ui/skeleton';

export function ModuleSwitcherSkeleton() {
  return (
    <div
      className="flex gap-2 items-center p-2"
    >
      <Skeleton className="flex aspect-square size-8 items-center justify-center">
      </Skeleton>
      <div className="grid flex-1 text-left text-sm leading-tight gap-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-3 w-16" />
      </div>
      <Skeleton className="ml-auto size-4" />
    </div>
  );
}