import { SALES_PREVIEW_COLUMNS } from '@/domain/sales/features/uploadStoreSalesBulk/constants/tableColumns';
import type { ParsedSalesData } from '@/domain/sales/features/uploadStoreSalesBulk/types';
import { Table } from 'antd';

interface Props {
  data: ParsedSalesData[];
}

export const SalesPreviewTable = ({ data }: Props) => {
  if (data.length === 0) return null;

  return (
    <div>
      <h4>미리보기 ({data.length}개)</h4>
      <Table
        dataSource={data}
        columns={SALES_PREVIEW_COLUMNS}
        rowKey="rowNumber"
        pagination={{ pageSize: 5 }}
        size="small"
      />
    </div>
  );
};
