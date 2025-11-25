import type { UpdateSupplierRequestDto } from '@/domain/suppliers/entities/api/supplier.dto';
import { supplierQueryKeys } from '@/domain/suppliers/entities/api/supplier.query';
import { updateSupplierApi } from '@/domain/suppliers/entities/api/supplier.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateSupplierMutationProps {
  supplierId: number;
  body: UpdateSupplierRequestDto;
}

export const useEditSupplierMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ supplierId, body }: UpdateSupplierMutationProps) =>
      updateSupplierApi(supplierId, body),
    onSuccess: () => {
      queryClient.invalidateQueries(supplierQueryKeys.supplier.list());
    },
  });
};
