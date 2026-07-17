import { IntegrationCardSkeleton } from './integration-card.skeleton'

interface IntegrationSectionSkeletonProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  cardCount?: number
}

export const IntegrationSectionSkeleton: React.FC<
  IntegrationSectionSkeletonProps
> = ({ icon: Icon, title, description, cardCount = 3 }) => {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-4.5 text-muted-foreground" />
        </div>
        <div className="flex flex-col gap-0.5">
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cardCount }).map((_, index) => (
          <IntegrationCardSkeleton key={index} />
        ))}
      </div>
    </section>
  )
}
