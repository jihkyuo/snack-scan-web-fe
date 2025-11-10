import { type StoreProductDto } from '@/domain/stores/entities/api/store.dto';

export const isLowStock = (product: StoreProductDto): boolean => {
  return product.currentStock <= product.minStock;
};

export const getStockStatus = (
  product: StoreProductDto
): 'low' | 'normal' | 'out' => {
  if (product.currentStock === 0) {
    return 'out';
  }
  if (isLowStock(product)) {
    return 'low';
  }
  return 'normal';
};

