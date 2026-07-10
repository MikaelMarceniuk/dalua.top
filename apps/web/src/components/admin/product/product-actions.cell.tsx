'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IconDotsVertical } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import type { Product } from './columns'

interface ProductActionsCellProps {
  product: Product
}

export const ProductActionsCell: React.FC<ProductActionsCellProps> = ({
  product,
}) => {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const canDelete = !product.hasOrders

  const handleDelete = async () => {
    console.log(`Deleting product "${product.name}"`)
  }

  const handleAvailability = async () => {
    console.log(`Toggling availability of "${product.name}"`)
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
          >
            <IconDotsVertical />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem
            onClick={() => router.push(`/products/${product.id}`)}
          >
            Mais detalhes
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/products/${product.id}/edit`)}
          >
            Editar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleAvailability}>
            {product.isAvailableForPurchase ? 'Desativar' : 'Ativar'}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            disabled={!canDelete}
            onClick={() => canDelete && setIsDeleteDialogOpen(true)}
          >
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deletar produto</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar &quot;{product.name}&quot;? Essa
              ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              {/* {isDeleting ? 'Deletando...' : 'Deletar'} */}
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
