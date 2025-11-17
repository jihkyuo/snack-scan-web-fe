import type { ColumnsType } from 'antd/es/table';
import type { ParsedSalesData } from '../types';

export const SALES_PREVIEW_COLUMNS: ColumnsType<ParsedSalesData> = [
  {
    title: '행',
    dataIndex: 'rowNumber',
    key: 'rowNumber',
    width: 60,
  },
  {
    title: '상품명',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: '수량',
    dataIndex: 'quantity',
    key: 'quantity',
    width: 100,
  },
  {
    title: '단가',
    dataIndex: 'unitPrice',
    key: 'unitPrice',
    width: 120,
    render: (price: number) => `₩${price.toLocaleString()}`,
  },
];

