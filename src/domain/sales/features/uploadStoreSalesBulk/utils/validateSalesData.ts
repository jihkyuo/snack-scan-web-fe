import type { ParsedSalesData, ValidationResult } from '../types';

/**
 * 파싱된 매출 데이터를 검증합니다.
 * @param data - 파싱된 데이터 배열
 * @param onInvalidRow - 잘못된 행 발견 시 호출되는 콜백
 * @returns 검증 결과 (유효한 데이터 배열, 무효한 데이터 개수)
 */
export const validateSalesData = (
  data: ParsedSalesData[],
  onInvalidRow?: (row: ParsedSalesData) => void
): ValidationResult => {
  let invalidCount = 0;

  const validData = data.filter((item) => {
    const isValid =
      item.productName.trim() !== '' &&
      item.quantity > 0 &&
      item.unitPrice > 0;

    if (!isValid) {
      invalidCount++;
      onInvalidRow?.(item);
    }

    return isValid;
  });

  return {
    validData,
    invalidCount,
  };
};

