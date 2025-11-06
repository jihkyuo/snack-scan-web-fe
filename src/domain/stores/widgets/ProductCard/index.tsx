import { type StoreProductDto } from '@/domain/stores/entities/api/store.dto';
import { storeQueryKeys } from '@/domain/stores/entities/api/store.query';
import { AddProductButton } from '@/domain/stores/features/addProduct/ui/AddProductButton';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const StoreProductCard = () => {
  const { storeId } = useParams({ from: '/stores/$storeId' });
  const { data } = useQuery(storeQueryKeys.store.products(storeId));

  const columns: ColumnsType<StoreProductDto> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '이름',
      dataIndex: 'productName',
    },
    {
      title: '브랜드',
      dataIndex: 'productBrand',
    },
    {
      title: '상품 가격',
      dataIndex: 'productPrice',
    },
    {
      title: '매장 가격',
      dataIndex: 'storePrice',
    },
    {
      title: '최소 재고',
      dataIndex: 'minStock',
    },
    {
      title: '현재 재고',
      dataIndex: 'currentStock',
    },
  ];

  return (
    <Card title="매장 상품" extra={<AddProductButton />}>
      <Table dataSource={data} columns={columns} />
    </Card>
  );
};
