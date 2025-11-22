import type { SupplierDto } from '@/domain/suppliers/entities/api/supplier.dto';
import { supplierQueryKeys } from '@/domain/suppliers/entities/api/supplier.query';
import { AddSupplierButton } from '@/domain/suppliers/features/addSupplier/ui';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Button, Card, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const Route = createFileRoute('/suppliers/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useQuery(supplierQueryKeys.supplier.list());

  const columns: ColumnsType<SupplierDto> = [
    {
      title: '이름',
      dataIndex: 'name',
      render: (name: string, record: SupplierDto) => (
        <Link to={`/suppliers/$supplierId`} params={{ supplierId: record.id }}>
          {name}
        </Link>
      ),
    },
    {
      title: '주소',
      dataIndex: 'address',
    },
    {
      title: '전화번호',
      dataIndex: 'phoneNumber',
    },
    {
      title: '이메일',
      dataIndex: 'email',
    },
    {
      title: '웹사이트',
      dataIndex: 'website',
    },
    {
      title: '작업',
      dataIndex: 'id',
      render: () => (
        <Space>
          <Button size="small" icon={<EditOutlined />} type="link">
            수정
          </Button>
          <Button size="small" icon={<DeleteOutlined />} type="primary" danger>
            삭제
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="공급업체 목록" extra={<AddSupplierButton />}>
      <Table dataSource={data} columns={columns} />
    </Card>
  );
}
