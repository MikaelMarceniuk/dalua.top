'use client'

import { useEffect, useRef, useState } from 'react'

export function useSectionObserver(sectionIds: readonly string[]) {
  const [activeId, setActiveId] = useState<string>(sectionIds[0])
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)

        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: '-96px 0px -70% 0px', threshold: 0 }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observerRef.current?.observe(el)
    })

    return () => observerRef.current?.disconnect()
  }, [sectionIds])

  function scrollToSection(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return { activeId, scrollToSection }
}
