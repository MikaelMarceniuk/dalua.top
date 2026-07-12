import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { productFormSections } from './constants/product-edit-sections.constants'

export const EditProductPageSkeleton = () => {
  return (
    <main className="p-4 lg:p-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[220px_1fr]">
        {/* Nav lateral */}
        <nav className="sticky top-20 flex flex-col gap-1 self-start">
          {productFormSections.map((section) => (
            <div
              key={section.id}
              className="flex items-center gap-2 rounded-md px-3 py-2"
            >
              <Skeleton className="size-4 rounded-sm" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </nav>

        {/* Seções */}
        <div className="flex flex-col gap-6">
          {/* Informações básicas */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-9 w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-32 w-full" />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-9 w-full" />
                </div>
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-9 w-11" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Imagens */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-80" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="aspect-square w-full rounded-lg"
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Variantes */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-4 w-96" />
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 rounded-lg border p-4"
                >
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-4 shrink-0 rounded-sm" />
                    <Skeleton className="h-9 flex-1" />
                    <Skeleton className="size-8 shrink-0 rounded-md" />
                  </div>
                  <div className="flex flex-col gap-2 pl-6">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <Skeleton key={j} className="h-8 w-full" />
                    ))}
                  </div>
                </div>
              ))}
              <Skeleton className="h-8 w-48" />
            </CardContent>
          </Card>

          {/* Conteúdos */}
          <Card>
            <CardHeader>
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-96" />
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-3 rounded-lg border p-4"
                >
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-4 shrink-0 rounded-sm" />
                    <Skeleton className="h-9 flex-1" />
                    <Skeleton className="size-8 shrink-0 rounded-md" />
                  </div>
                  <Skeleton className="h-24 w-full" />
                </div>
              ))}
              <Skeleton className="h-8 w-36" />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
