import type { StoreDto } from '@/domain/stores/entities/api/store.dto';
import { storeQueryKeys } from '@/domain/stores/entities/api/store.query';
import { AddStoreButton } from '@/domain/stores/features/addStore/ui/AddStoreButton';
import { DeleteStoreButton } from '@/domain/stores/features/deleteStore/ui/DeleteStoreButton';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const Route = createFileRoute('/stores/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery(storeQueryKeys.store.list());

  const columns: ColumnsType<StoreDto> = [
    {
      title: '이름',
      dataIndex: 'name',
    },
    {
      title: '주소',
      dataIndex: 'address',
    },
    {
      title: '삭제',
      dataIndex: 'id',
      render: (_, record) => <DeleteStoreButton id={record.id} />,
    },
  ];

  return (
    <>
      <Card title="매장 목록" extra={<AddStoreButton />}>
        <Table dataSource={data} columns={columns} />
      </Card>
    </>
  );
}
