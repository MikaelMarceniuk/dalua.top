import { IconTools } from '@tabler/icons-react'

interface InConstructionProps {
  title?: string
  description?: string
}

export function InConstruction({
  title = 'Em construção',
  description = 'Esta funcionalidade ainda está sendo desenvolvida. Em breve estará disponível por aqui.',
}: InConstructionProps) {
  return (
    <div className="m-8 flex h-full flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-10 text-center">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <IconTools className="size-8 text-muted-foreground" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-medium">{title}</h3>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
