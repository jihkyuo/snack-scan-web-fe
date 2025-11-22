export interface SupplierDto {
  id: number;
  name: string;
  address?: string;
  phoneNumber: string;
  email: string;
  website?: string;
}

export interface CreateSupplierRequestDto {
  name: string;
  address?: string;
  phoneNumber: string;
  email: string;
  website?: string;
}
