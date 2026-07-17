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
import { Product } from '@/components/admin/types/product.type'
import { useDeleteProduct } from '@/components/admin/pages/product/hooks/use-delete-product.hook'
import { useUpdateProductAvailability } from '@/components/admin/pages/product/hooks/use-update-product-availability.hook'
import { toast } from 'sonner'

interface ProductActionsCellProps {
  product: Product
}

export const ProductActionsCell: React.FC<ProductActionsCellProps> = ({
  product,
}) => {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const { mutateAsync: deleteProduct, isPending: isDeleting } =
    useDeleteProduct({
      id: product.id,
    })

  const { mutateAsync: updateProductAvailability } =
    useUpdateProductAvailability({
      id: product.id,
    })

  const canDelete = product.orderCount == 0

  const handleDelete = async () => {
    await deleteProduct(undefined, {
      onSuccess: () =>
        toast.success(`Produto "${product.name}" deletado com sucesso!`),
      onError: () => {},
    })
  }

  const handleAvailability = async () => {
    await updateProductAvailability(undefined, {
      onSuccess: () =>
        toast.success(
          `Disponibilidade do produto "${product.name}" atualizado para "${product.isAvailableForPurchase ? 'Indisponível' : 'Disponível'}" com sucesso!`
        ),
      onError: () => {},
    })
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
            onClick={() =>
              router.push(`/admin/product/${product.slug}/details`)
            }
          >
            Mais detalhes
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/admin/product/${product.slug}/edit`)}
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
              {isDeleting ? 'Deletando...' : 'Deletar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
