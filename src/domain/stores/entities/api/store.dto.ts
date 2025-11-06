export interface StoreDto {
  id: number;
  name: string;
  address: string;
}

export interface CreateStoreForm {
  name: string;
  address: string;
}

export interface EmployeeDto {
  memberId: number;
  name: string;
  phoneNumber: string;
}

export interface StoreProductDto {
  id: number;
  minStock: number;
  currentStock: number;
  storePrice: number;
  productId: number;
  productName: string;
  productBrand: string;
  productPrice: number;
}

export interface CreateStoreProductForm {
  minStock: number;
  currentStock: number;
  storePrice: number;
  productId: number;
}

export interface CreateStoreNewProductForm {
  minStock: number;
  currentStock: number;
  storePrice: number;
  productName: string;
  productBrand: string;
  productPrice: number;
}