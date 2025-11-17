import type {
  AddStoreSalesBulkRequestDto,
  AddStoreSalesRequestDto,
  SalesDto,
} from '@/domain/sales/entities/sales.dto';
import { client } from '@/shared/api/client';

// 매장 매출 목록 조회
export const getStoreSalesApi = async (storeId: number) => {
  return (await client.get<SalesDto[]>(`sales/stores/${storeId}`)).data;
};

// 매장 매출 추가
export const addStoreSalesApi = async (
  storeId: number,
  body: AddStoreSalesRequestDto
) => {
  return (await client.post(`sales/stores/${storeId}`, body)).data;
};

// 매장 매출 추가(벌크)
export const addStoreSalesBulkApi = async (
  storeId: number,
  body: AddStoreSalesBulkRequestDto
) => {
  return (await client.post(`sales/stores/${storeId}/bulk`, body)).data;
};
