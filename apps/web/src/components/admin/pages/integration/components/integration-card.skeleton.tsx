import { Skeleton } from '@/components/ui/skeleton'

export const IntegrationCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="size-9 rounded-lg" />
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="h-9 w-full rounded-md" />
    </div>
  )
}
