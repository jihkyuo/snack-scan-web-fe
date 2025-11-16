import type { SalesDto } from '@/domain/sales/entities/sales.dto';
import { client } from '@/shared/api/client';

// 매장 매출 목록 조회
export const getStoreSalesApi = async (storeId: number) => {
  return (await client.get<SalesDto[]>(`sales/stores/${storeId}`)).data;
};
