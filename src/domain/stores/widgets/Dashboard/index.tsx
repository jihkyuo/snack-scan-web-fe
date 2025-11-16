import {
  type StoreDto,
  type StoreProductDto,
} from '@/domain/stores/entities/api/store.dto';
import { storeQueryKeys } from '@/domain/stores/entities/api/store.query';
import {
  getLowStockCount,
  getOutOfStockCount,
} from '@/domain/stores/features/lowStockAlert/utils/filterLowStock';
import { getStockStatus } from '@/domain/stores/features/lowStockAlert/utils/stockStatus';
import {
  ExclamationCircleOutlined,
  ShopOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { useQueries, useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { Card, Col, Row, Statistic, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

export const Dashboard = () => {
  const { data: stores } = useQuery(storeQueryKeys.store.list());

  // 모든 매장의 상품 데이터를 병렬로 가져오기
  const productQueries = useQueries({
    queries:
      stores?.map((store) => ({
        ...storeQueryKeys.store.products(store.id),
        enabled: !!store.id,
      })) || [],
  });

  // 모든 상품을 하나의 배열로 합치기
  const allProducts: StoreProductDto[] = productQueries
    .map((query) => query.data || [])
    .flat()
    .filter((product): product is StoreProductDto => product !== undefined);

  // 통계 계산
  const totalStores = stores?.length || 0;
  const totalProducts = allProducts.length;
  const lowStockProducts = allProducts.filter(
    (p) => getStockStatus(p) === 'low' || getStockStatus(p) === 'out'
  );
  const outOfStockProducts = allProducts.filter(
    (p) => getStockStatus(p) === 'out'
  );
  const lowStockCount = lowStockProducts.length;
  const outOfStockCount = outOfStockProducts.length;

  // 매장별 재고 상태 요약
  const storeSummary = stores?.map((store, index) => {
    const storeProducts = productQueries[index]?.data || [];
    const storeLowStockCount = getLowStockCount(storeProducts);
    const storeOutOfStockCount = getOutOfStockCount(storeProducts);
    return {
      ...store,
      totalProducts: storeProducts.length,
      lowStockCount: storeLowStockCount,
      outOfStockCount: storeOutOfStockCount,
    };
  });

  const storeSummaryColumns: ColumnsType<
    StoreDto & {
      totalProducts: number;
      lowStockCount: number;
      outOfStockCount: number;
    }
  > = [
    {
      title: '매장명',
      dataIndex: 'name',
      render: (name: string, record: StoreDto) => (
        <Link to="/stores/$storeId" params={{ storeId: record.id }}>
          {name}
        </Link>
      ),
    },
    {
      title: '주소',
      dataIndex: 'address',
    },
    {
      title: '상품 수',
      dataIndex: 'totalProducts',
    },
    {
      title: '재고 부족',
      dataIndex: 'lowStockCount',
      render: (count: number) => {
        if (count === 0) return <span>{count}</span>;
        return (
          <span style={{ color: '#faad14', fontWeight: 'bold' }}>
            <ExclamationCircleOutlined /> {count}
          </span>
        );
      },
    },
    {
      title: '재고 없음',
      dataIndex: 'outOfStockCount',
      render: (count: number) => {
        if (count === 0) return <span>{count}</span>;
        return (
          <span style={{ color: '#ff4d4f', fontWeight: 'bold' }}>{count}</span>
        );
      },
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h1 style={{ marginBottom: '24px' }}>대시보드</h1>

      {/* 통계 카드 */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="전체 매장 수"
              value={totalStores}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="총 상품 수"
              value={totalProducts}
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="재고 부족 상품"
              value={lowStockCount}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="재고 없음"
              value={outOfStockCount}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 매장별 재고 상태 요약 */}
      <Card title="매장별 재고 상태">
        <Table
          dataSource={storeSummary}
          columns={storeSummaryColumns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
        />
      </Card>
    </div>
  );
};
