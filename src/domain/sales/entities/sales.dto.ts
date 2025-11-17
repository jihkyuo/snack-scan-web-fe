export interface SalesDto {
  id: number;
  storeId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  saleDate: string;
}

export interface AddStoreSalesRequestDto {
  productName: string;
  quantity: number;
  unitPrice: number;
}
