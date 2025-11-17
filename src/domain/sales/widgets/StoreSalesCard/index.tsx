import type { SalesDto } from '@/domain/sales/entities/sales.dto';
import { salesQueryKeys } from '@/domain/sales/entities/sales.query';
import { AddStoreSalesButton } from '@/domain/sales/features/addStoreSales/ui';
import { UploadOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Button, Card, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const StoreSalesCard = () => {
  const { storeId } = useParams({ from: '/stores/$storeId' });
  const { data } = useQuery(salesQueryKeys.store.list(storeId));

  const columns: ColumnsType<SalesDto> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '상품명',
      dataIndex: 'productName',
    },
    {
      title: '수량',
      dataIndex: 'quantity',
    },
    {
      title: '단가',
      dataIndex: 'unitPrice',
    },
    {
      title: '총액',
      dataIndex: 'totalAmount',
    },
    {
      title: '판매일',
      dataIndex: 'saleDate',
    },
  ];

  return (
    <Card
      title="매출"
      extra={
        <Space>
          <AddStoreSalesButton />
          <Button icon={<UploadOutlined />} type="primary">
            업로드
          </Button>
        </Space>
      }
    >
      <Table dataSource={data} columns={columns} />
    </Card>
  );
};
