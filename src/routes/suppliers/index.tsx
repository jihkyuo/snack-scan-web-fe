import type { SupplierDto } from '@/domain/suppliers/entities/api/supplier.dto';
import { supplierQueryKeys } from '@/domain/suppliers/entities/api/supplier.query';
import { AddSupplierButton } from '@/domain/suppliers/features/addSupplier/ui';
import { DeleteSupplierButton } from '@/domain/suppliers/features/deleteSupplier/ui';
import { EditSupplierButton } from '@/domain/suppliers/features/editSupplier/ui/EditSupplierButton';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { Card, Space, Table } from 'antd';
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
      render: (_, record) => (
        <Space>
          <EditSupplierButton supplierId={record.id} supplier={record} />
          <DeleteSupplierButton id={record.id} />
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
