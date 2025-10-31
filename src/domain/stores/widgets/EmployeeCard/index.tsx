import { type EmployeeDto } from '@/domain/stores/entities/api/store.dto';
import { storeQueryKeys } from '@/domain/stores/entities/api/store.query';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const EmployeeCard = () => {
  const { storeId } = useParams({ from: '/stores/$storeId' });
  const { data } = useQuery(storeQueryKeys.store.employees(storeId));

  const columns: ColumnsType<EmployeeDto> = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '이름',
      dataIndex: 'name',
    },
    {
      title: '전화번호',
      dataIndex: 'phoneNumber',
    },
  ];

  return (
    <Card title="매장 직원">
      <Table dataSource={data} columns={columns} />
    </Card>
  );
};
