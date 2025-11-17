import type { AddStoreSalesRequestDto } from '@/domain/sales/entities/sales.dto';
import { salesQueryKeys } from '@/domain/sales/entities/sales.query';
import { addStoreSalesApi } from '@/domain/sales/entities/sales.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface AddStoreSalesMutationProps {
  storeId: number;
  body: AddStoreSalesRequestDto;
}

const mutationFn = async ({ storeId, body }: AddStoreSalesMutationProps) => {
  return addStoreSalesApi(storeId, body);
};

export const useAddStoreSalesMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: (_, { storeId }) => {
      queryClient.invalidateQueries({
        queryKey: salesQueryKeys.store.list(storeId).queryKey,
      });
    },
  });
};
