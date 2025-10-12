import type {
  CreateStoreForm,
  StoreDto,
} from '@/domain/stores/entities/api/store.dto';
import { client } from '@/shared/api/client';

export const getStoresApi = async () => {
  return (await client.get<StoreDto[]>('/stores')).data;
};

export const createStoreApi = async (body: CreateStoreForm) => {
  return (await client.post('/stores', body)).data;
};

export const deleteStoreApi = async (id: number) => {
  return (await client.delete(`/stores/${id}`)).data;
};
