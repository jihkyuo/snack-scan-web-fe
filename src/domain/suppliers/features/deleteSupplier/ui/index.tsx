import { supplierQueryKeys } from '@/domain/suppliers/entities/api/supplier.query';
import { deleteSupplierApi } from '@/domain/suppliers/entities/api/supplier.service';
import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';
import { Button, Popconfirm } from 'antd';

interface Props {
  id: number;
}

export const DeleteSupplierButton = ({ id }: Props) => {
  const { mutate } = useMutation({
    mutationFn: deleteSupplierApi,
    onSuccess: () => {
      queryClient.invalidateQueries(supplierQueryKeys.supplier.list());
    },
  });

  return (
    <Popconfirm title="정말 삭제하시겠습니까?" onConfirm={() => mutate(id)}>
      <Button size="small" danger type="primary">
        삭제
      </Button>
    </Popconfirm>
  );
};
