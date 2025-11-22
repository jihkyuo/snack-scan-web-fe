import { supplierQueryKeys } from '@/domain/suppliers/entities/api/supplier.query';
import { createSupplierApi } from '@/domain/suppliers/entities/api/supplier.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddSupplierMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createSupplierApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: supplierQueryKeys.supplier.list().queryKey,
      });
    },
  });
};
