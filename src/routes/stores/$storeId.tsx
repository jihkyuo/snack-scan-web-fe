import { EmployeeCard } from '@/domain/stores/widgets/EmployeeCard';
import { LowStockAlertCard } from '@/domain/stores/widgets/LowStockAlertCard';
import { StoreProductCard } from '@/domain/stores/widgets/ProductCard';
import { createFileRoute } from '@tanstack/react-router';
import { Space } from 'antd';
import z from 'zod';

export const Route = createFileRoute('/stores/$storeId')({
  component: RouteComponent,
  params: {
    parse: (params) => ({
      storeId: z.coerce.number().parse(params.storeId),
    }),
    stringify: ({ storeId }) => ({ storeId: `${storeId}` }),
  },
});

function RouteComponent() {
  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      <LowStockAlertCard />
      <EmployeeCard />
      <StoreProductCard />
    </Space>
  );
}
