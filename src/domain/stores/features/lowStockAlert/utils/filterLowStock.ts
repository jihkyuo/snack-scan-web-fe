import { type StoreProductDto } from '@/domain/stores/entities/api/store.dto';
import { isLowStock } from '@/domain/stores/features/lowStockAlert/utils/stockStatus';

export const filterLowStockProducts = (
  products: StoreProductDto[] | undefined
): StoreProductDto[] => {
  if (!products) return [];
  return products.filter(isLowStock);
};

export const getLowStockCount = (
  products: StoreProductDto[] | undefined
): number => {
  if (!products) return 0;
  return products.filter(isLowStock).length;
};
