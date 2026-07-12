'use client'

import { cn } from '@/lib/utils'
import { productFormSections } from './constants/product-edit-sections.constants'
import { useSectionObserver } from './hooks/use-section-observer.hooks'

export const ProductFormNav = () => {
  const sectionIds = productFormSections.map((s) => s.id)
  const { activeId, scrollToSection } = useSectionObserver(sectionIds)

  return (
    <nav className="sticky top-20 flex flex-col gap-1 self-start">
      {productFormSections.map((section) => {
        const Icon = section.icon
        const isActive = activeId === section.id

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollToSection(section.id)}
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
            )}
          >
            <Icon className="size-4" />
            {section.label}
          </button>
        )
      })}
    </nav>
  )
}
