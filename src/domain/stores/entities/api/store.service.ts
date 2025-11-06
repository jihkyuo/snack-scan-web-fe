import { LOGGED_IN_MEMBER_ID } from '@/domain/members/entities/constants';
import type {
  CreateStoreForm,
  CreateStoreNewProductForm,
  CreateStoreProductForm,
  EmployeeDto,
  StoreDto,
  StoreProductDto
} from '@/domain/stores/entities/api/store.dto';
import { client } from '@/shared/api/client';

export const getStoresApi = async () => {
  return (await client.get<StoreDto[]>('/stores')).data;
};

export const createStoreApi = async (body: CreateStoreForm) => {
  return (
    await client.post('/stores', {
      ...body,
      memberId: LOGGED_IN_MEMBER_ID,
    })
  ).data;
};

export const deleteStoreApi = async (id: number) => {
  return (await client.delete(`/stores/${id}`)).data;
};

// 매장 직원 목록 조회
export const getStoreEmployeesApi = async (storeId: number) => {
  return (await client.get<EmployeeDto[]>(`/stores/${storeId}/employees`)).data;
};

// 매장 상품 목록 조회
export const getStoreProductsApi = async (storeId: number) => {
  return (await client.get<StoreProductDto[]>(`/stores/${storeId}/products`))
    .data;
};

// 매장 상품 추가(기존 상품 추가)
export const createStoreProductApi = async (
  storeId: number,
  body: CreateStoreProductForm
) => {
  return (await client.post(`/stores/${storeId}/products`, body)).data;
};

// 매장 상품 추가(새 상품 추가)
export const createStoreNewProductApi = async (
  storeId: number,
  body: CreateStoreNewProductForm
) => {
  return (await client.post(`/stores/${storeId}/products/new`, body)).data;
};