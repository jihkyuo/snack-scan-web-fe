import { type StoreProductDto } from '@/domain/stores/entities/api/store.dto';
import { storeQueryKeys } from '@/domain/stores/entities/api/store.query';
import { AddProductButton } from '@/domain/stores/features/addProduct/ui/AddProductButton';
import { getStockStatus } from '@/domain/stores/features/lowStockAlert/utils/stockStatus';
import { UpdateStockButton } from '@/domain/stores/features/updateStock/ui/UpdateStockButton';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Badge, Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ExclamationCircleOutlined } from '@ant-design/icons';

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
      render: (productName: string, record: StoreProductDto) => {
        const status = getStockStatus(record);
        if (status === 'low' || status === 'out') {
          return (
            <span>
              <ExclamationCircleOutlined
                style={{
                  color: status === 'out' ? '#ff4d4f' : '#faad14',
                  marginRight: 4,
                }}
              />
              {productName}
            </span>
          );
        }
        return productName;
      },
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
      render: (currentStock: number, record: StoreProductDto) => {
        const status = getStockStatus(record);
        if (status === 'out') {
          return (
            <Badge
              count={currentStock}
              showZero
              color="red"
              title="재고 없음"
            />
          );
        }
        if (status === 'low') {
          return (
            <Badge
              count={currentStock}
              showZero
              color="orange"
              title="재고 부족"
            />
          );
        }
        return <Badge count={currentStock} showZero />;
      },
    },
    {
      title: '작업',
      key: 'action',
      render: (_, record) => (
        <UpdateStockButton
          storeId={Number(storeId)}
          productId={record.id}
          currentStock={record.currentStock}
        />
      ),
    },
  ];

  return (
    <Card title="매장 상품" extra={<AddProductButton />}>
      <Table dataSource={data} columns={columns} />
    </Card>
  );
};
