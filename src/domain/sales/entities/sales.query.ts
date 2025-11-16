import { getStoreSalesApi } from '@/domain/sales/entities/sales.service';
import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const salesQueryKeys = createQueryKeyStore({
  store: {
    list: (storeId: number) => ({
      queryKey: [storeId],
      queryFn: () => getStoreSalesApi(storeId),
    }),
  },
});
