import { storeQueryKeys } from '@/domain/stores/entities/api/store.query';
import { updateStoreProductStockApi } from '@/domain/stores/entities/api/store.service';
import type { UpdateStockForm } from '@/domain/stores/entities/api/store.dto';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateStockMutationProps {
  storeId: number;
  productId: number;
  body: UpdateStockForm;
}

export const useUpdateStockMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeId, productId, body }: UpdateStockMutationProps) =>
      updateStoreProductStockApi(storeId, productId, body),
    onSuccess: (_, { storeId }) => {
      queryClient.invalidateQueries({
        queryKey: storeQueryKeys.store.products(storeId).queryKey,
      });
    },
  });
};

