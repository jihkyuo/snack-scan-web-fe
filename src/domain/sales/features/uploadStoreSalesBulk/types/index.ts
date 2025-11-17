import type { AddStoreSalesRequestDto } from '@/domain/sales/entities/sales.dto';

export interface ParsedSalesData extends AddStoreSalesRequestDto {
  rowNumber: number; // 엑셀의 행 번호 (에러 추적용)
}

export interface ValidationResult {
  validData: ParsedSalesData[];
  invalidCount: number;
}

