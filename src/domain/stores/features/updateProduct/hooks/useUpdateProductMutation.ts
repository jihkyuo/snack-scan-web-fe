import type {
  UpdateStoreProductRequestDto
} from '@/domain/stores/entities/api/store.dto';
import { storeQueryKeys } from '@/domain/stores/entities/api/store.query';
import {
  updateStoreProductApi
} from '@/domain/stores/entities/api/store.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateProductMutationProps {
  storeProductId: number;
  storeId: number;
  body: UpdateStoreProductRequestDto;
}

export const useUpdateProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ storeProductId, body }: UpdateProductMutationProps) =>
      updateStoreProductApi(storeProductId, body),
    onSuccess: (_, { storeId }) => {
      queryClient.invalidateQueries({
        queryKey: storeQueryKeys.store.products(storeId).queryKey,
      });
    },
  });
};
