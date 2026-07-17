'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { IconLoader2, IconCheck } from '@tabler/icons-react'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import {
  SUBMIT_STEPS,
  type SubmitStep,
} from './constants/submit-steps.constants'

const STEP_ORDER: Exclude<SubmitStep, 'idle'>[] = [
  'updatingProduct',
  'updatingExistingPhotos',
  'uploadingNewPhotos',
  'refetchingProduct',
]

interface SubmitProgressOverlayProps {
  currentStep: SubmitStep
  skippedSteps?: SubmitStep[]
}

export function SubmitProgressOverlay({
  currentStep,
  skippedSteps = [],
}: SubmitProgressOverlayProps) {
  const isOpen = currentStep !== 'idle'
  const currentIndex = STEP_ORDER.indexOf(
    currentStep as Exclude<SubmitStep, 'idle'>
  )
  const visibleSteps = STEP_ORDER.filter((step) => !skippedSteps.includes(step))

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-sm [&>button]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <VisuallyHidden>
          <DialogTitle className="sr-only">Salvando produto</DialogTitle>
        </VisuallyHidden>

        <h3 className="text-sm font-medium">Salvando produto...</h3>

        <div className="flex flex-col gap-3">
          {visibleSteps.map((step) => {
            const stepIndex = STEP_ORDER.indexOf(step)
            const isDone = stepIndex < currentIndex
            const isActive = step === currentStep

            return (
              <motion.div
                key={step}
                layout
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 text-sm"
              >
                <div className="flex size-5 shrink-0 items-center justify-center">
                  <AnimatePresence mode="wait" initial={false}>
                    {isDone ? (
                      <motion.div
                        key="done"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 20,
                        }}
                      >
                        <IconCheck className="size-4 text-green-600" />
                      </motion.div>
                    ) : isActive ? (
                      <motion.div
                        key="active"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <IconLoader2 className="size-4 animate-spin text-primary" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="pending"
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="size-1.5 rounded-full bg-muted-foreground/30"
                      />
                    )}
                  </AnimatePresence>
                </div>

                <motion.span
                  animate={{
                    opacity: isDone ? 0.6 : 1,
                    color: isDone
                      ? 'var(--muted-foreground)'
                      : isActive
                        ? 'var(--foreground)'
                        : 'var(--muted-foreground)',
                  }}
                  transition={{ duration: 0.2 }}
                  className={
                    isDone ? 'line-through' : isActive ? 'font-medium' : ''
                  }
                >
                  {SUBMIT_STEPS[step]}
                </motion.span>
              </motion.div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}
