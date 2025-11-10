import { type StoreProductDto } from '@/domain/stores/entities/api/store.dto';
import { storeQueryKeys } from '@/domain/stores/entities/api/store.query';
import { filterLowStockProducts } from '@/domain/stores/features/lowStockAlert/utils/filterLowStock';
import { getStockStatus } from '@/domain/stores/features/lowStockAlert/utils/stockStatus';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Alert, Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export const LowStockAlertCard = () => {
  const { storeId } = useParams({ from: '/stores/$storeId' });
  const { data: allProducts } = useQuery(
    storeQueryKeys.store.products(storeId)
  );
  const lowStockProducts = filterLowStockProducts(allProducts);

  if (!lowStockProducts || lowStockProducts.length === 0) {
    return null;
  }

  const columns: ColumnsType<StoreProductDto> = [
    {
      title: '상품명',
      dataIndex: 'productName',
      render: (productName: string, record: StoreProductDto) => {
        const status = getStockStatus(record);
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
      },
    },
    {
      title: '브랜드',
      dataIndex: 'productBrand',
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
        return (
          <span
            style={{
              color: status === 'out' ? '#ff4d4f' : '#faad14',
              fontWeight: 'bold',
            }}
          >
            {currentStock}
          </span>
        );
      },
    },
  ];

  const outOfStockCount = lowStockProducts.filter(
    (p) => getStockStatus(p) === 'out'
  ).length;
  const lowStockCount = lowStockProducts.length - outOfStockCount;

  return (
    <Card
      title={
        <span>
          <ExclamationCircleOutlined style={{ color: '#faad14' }} /> 재고 부족
          알림
        </span>
      }
    >
      <Alert
        message={`재고 없음: ${outOfStockCount}개, 재고 부족: ${lowStockCount}개`}
        type="warning"
        showIcon
        style={{ marginBottom: 16 }}
      />
      <Table
        dataSource={lowStockProducts}
        columns={columns}
        pagination={{ pageSize: 5 }}
        rowKey="id"
      />
    </Card>
  );
};

