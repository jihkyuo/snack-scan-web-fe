import type {
  CreateSupplierRequestDto,
  SupplierDto,
  UpdateSupplierRequestDto,
} from '@/domain/suppliers/entities/api/supplier.dto';
import { client } from '@/shared/api/client';

/**
 * 공급업체 목록 조회
 * */
export const getSuppliersApi = async () => {
  return (await client.get<SupplierDto[]>('/suppliers')).data;
};

/**
 * 공급업체 생성
 * */
export const createSupplierApi = async (body: CreateSupplierRequestDto) => {
  return (await client.post('/suppliers', body)).data;
};

/**
 * 공급업체 수정
 * */
export const updateSupplierApi = async (
  id: number,
  body: UpdateSupplierRequestDto
) => {
  return (await client.put(`/suppliers/${id}`, body)).data;
};

/**
 * 공급업체 삭제
 * */
export const deleteSupplierApi = async (id: number) => {
  return (await client.delete(`/suppliers/${id}`)).data;
};
