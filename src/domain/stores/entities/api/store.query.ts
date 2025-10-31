import {
  getStoreEmployeesApi,
  getStoreProductsApi,
  getStoresApi,
} from '@/domain/stores/entities/api/store.service';
import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const storeQueryKeys = createQueryKeyStore({
  store: {
    list: () => ({
      queryKey: ['list'],
      queryFn: getStoresApi,
    }),
    employees: (storeId: number) => ({
      queryKey: [storeId],
      queryFn: () => getStoreEmployeesApi(storeId),
    }),
    products: (storeId: number) => ({
      queryKey: [storeId],
      queryFn: () => getStoreProductsApi(storeId),
    }),
  },
});
