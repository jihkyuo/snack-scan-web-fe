import { storeQueryKeys } from '@/domain/stores/entities/api/store.query';
import { deleteStoreApi } from '@/domain/stores/entities/api/store.service';
import { queryClient } from '@/main';
import { useMutation } from '@tanstack/react-query';
import { Button, Popconfirm } from 'antd';

interface Props {
  id: number;
}

export const DeleteStoreButton = ({ id }: Props) => {
  const { mutate } = useMutation({
    mutationFn: deleteStoreApi,
    onSuccess: () => {
      queryClient.invalidateQueries(storeQueryKeys.store.list());
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
