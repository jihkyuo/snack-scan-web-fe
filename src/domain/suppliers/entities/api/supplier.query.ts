import { getSuppliersApi } from '@/domain/suppliers/entities/api/supplier.service';
import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const supplierQueryKeys = createQueryKeyStore({
  supplier: {
    list: () => ({
      queryKey: ['list'],
      queryFn: getSuppliersApi,
    }),
  },
});
