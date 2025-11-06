import type {
  CreateStoreProductForm,
  CreateStoreNewProductForm,
} from '@/domain/stores/entities/api/store.dto';

export type AddStoreProductType = 'EXISTING_PRODUCT' | 'NEW_PRODUCT';

export type AddStoreProductForm = {
  type: AddStoreProductType;
} & (
  | (CreateStoreProductForm & { type: 'EXISTING_PRODUCT' })
  | (CreateStoreNewProductForm & { type: 'NEW_PRODUCT' })
);
