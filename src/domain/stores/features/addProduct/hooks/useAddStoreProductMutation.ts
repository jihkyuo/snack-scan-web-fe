import { storeQueryKeys } from '@/domain/stores/entities/api/store.query';
import {
  createStoreNewProductApi,
  createStoreProductApi,
} from '@/domain/stores/entities/api/store.service';
import type { AddStoreProductForm } from '@/domain/stores/features/addProduct/types/addStoreProductForm.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AddStoreProductMutationProps {
  storeId: number;
  body: AddStoreProductForm;
}

const mutationFn = async ({ storeId, body }: AddStoreProductMutationProps) => {
  if (body.type === 'EXISTING_PRODUCT') {
    return createStoreProductApi(storeId, body);
  } else {
    return createStoreNewProductApi(storeId, body);
  }
};

export const useAddStoreProductMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (_, { storeId }) => {
      queryClient.invalidateQueries({
        queryKey: storeQueryKeys.store.products(storeId).queryKey,
      });
    },
  });
};
